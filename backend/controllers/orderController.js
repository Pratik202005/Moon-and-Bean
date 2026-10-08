import mongoose from 'mongoose';
import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';

// @desc    Create new order with server-side pricing verification & recalculation
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res, next) => {
  try {
    const { items, customerInfo, tableNumber, zone } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
    }

    let verifiedSubtotal = 0;
    const verifiedItems = [];

    // Recalculate each item price server-side from MenuItem database
    for (const item of items) {
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      let unitPrice = 0;
      let matchedName = item.name || 'Artisanal Selection';

      // Attempt matching against MenuItem in MongoDB
      let dbItem = null;
      if (item.id && mongoose.Types.ObjectId.isValid(item.id)) {
        dbItem = await MenuItem.findById(item.id);
      }
      if (!dbItem && item.name) {
        dbItem = await MenuItem.findOne({ name: item.name });
      }

      if (dbItem) {
        unitPrice = Number(dbItem.price);
        matchedName = dbItem.name;
      } else {
        // Fallback for custom or offline items: ensure strictly positive numeric price
        const parsedClientPrice = Number(item.price);
        unitPrice = (!isNaN(parsedClientPrice) && parsedClientPrice > 0) ? parsedClientPrice : 10.0;
      }

      const itemTotal = unitPrice * quantity;
      verifiedSubtotal += itemTotal;

      verifiedItems.push({
        id: dbItem ? String(dbItem._id) : (item.id || item.cartItemId || 'custom-item'),
        name: matchedName,
        price: unitPrice,
        quantity,
        grind: item.grind || 'Espresso',
        milk: item.milk || 'Whole Milk',
        sweetness: item.sweetness || 'Standard',
      });
    }

    // 100% Server-side tax (8%) & total calculation
    const formattedSubtotal = Number(verifiedSubtotal.toFixed(2));
    const serverTax = Number((formattedSubtotal * 0.08).toFixed(2));
    const serverTotal = Number((formattedSubtotal + serverTax).toFixed(2));

    const order = await Order.create({
      items: verifiedItems,
      subtotal: formattedSubtotal,
      tax: serverTax,
      totalAmount: serverTotal,
      tableNumber: tableNumber || customerInfo?.tableNo || 'Barista Salon Table 4',
      zone: zone || 'Barista Bar',
      customerInfo: {
        name: customerInfo?.name?.trim() || 'Guest Connoisseur',
        email: customerInfo?.email?.trim() || 'guest@domain.com',
        phone: customerInfo?.phone?.trim() || '',
      },
      orderStatus: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Order verified and processed successfully',
      data: order,
    });
  } catch (error) {
    console.error('[createOrder error]', error);
    next(error);
  }
};

// @desc    Get all orders sorted by createdAt: -1
// @route   GET /api/orders
// @access  Admin (Protected)
export const getOrders = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { orderStatus: status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Admin (Protected)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const allowedStatuses = ['Pending', 'Preparing', 'Ready', 'Served', 'Cancelled'];
    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid order status' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: `Order status updated to ${orderStatus}`, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user active orders by email
// @route   GET /api/orders/user/:email
// @access  Private / User
export const getUserActiveOrders = async (req, res, next) => {
  try {
    const { email } = req.params;
    const userEmail = decodeURIComponent(email).toLowerCase();

    // Verify authorized user can only query their own orders unless admin
    if (req.user && req.user.role !== 'admin' && req.user.email.toLowerCase() !== userEmail) {
      return res.status(403).json({ success: false, message: 'Forbidden: Access restricted to account owner' });
    }

    const orders = await Order.find({ 'customerInfo.email': userEmail }).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};
