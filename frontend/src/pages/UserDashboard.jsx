import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserAuth } from '../context/UserAuthContext';
import DigitalPassModal from '../components/ui/DigitalPassModal';
import API_BASE_URL from '../config/api';
import SpecularGlow from '../components/ui/SpecularGlow';
import {
  Sparkles,
  Calendar,
  MapPin,
  Users,
  QrCode,
  LogOut,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, userToken, logout } = useUserAuth();
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedPass, setSelectedPass] = useState(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch User Reservations
        const resRes = await fetch(`${API_BASE_URL}/user/reservations`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (resRes.ok) {
          const resJson = await resRes.json();
          if (resJson.success) setReservations(resJson.data);
        }

        // Fetch User Orders
        const orderRes = await fetch(`${API_BASE_URL}/user/orders`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (orderRes.ok) {
          const orderJson = await orderRes.json();
          if (orderJson.success) setOrders(orderJson.data);
        }
      } catch (err) {
        console.error('[Moon & Bean User Dashboard Fetch]', err);
      }
    };

    if (userToken) {
      fetchUserData();
      const interval = setInterval(fetchUserData, 5000);
      return () => clearInterval(interval);
    }
  }, [userToken]);

  const activeBooking = reservations[0];
  const pastOrders = orders.filter((o) => ['Served', 'Completed', 'Cancelled'].includes(o.orderStatus));

  return (
    <div className="min-h-screen bg-moon-black text-moon-cream pt-32 pb-32 px-6 md:px-16 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-10 w-[700px] h-[700px] bg-moon-gold/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        {/* Welcome Header */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-moon-gold" />
              <span className="font-mono text-xs text-moon-gold uppercase tracking-widest font-medium">
                MOON &amp; BEAN CONNOISSEUR EXPERIENCE
              </span>
            </div>
            <h1 className="font-cinzel text-3xl md:text-4xl text-moon-cream font-medium">
              Welcome Back, {user?.name || 'Valued Member'}
            </h1>
            <p className="font-sans text-xs text-moon-muted font-light">
              Member Tier: <span className="text-moon-gold font-medium">Grand Reserve Connoisseur</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/reservation"
              className="px-5 py-3 rounded-full bg-moon-gold text-moon-black font-sans text-xs uppercase tracking-wider font-semibold hover:bg-moon-amber transition shadow-lg shadow-moon-gold/20"
            >
              Book New Cupping
            </Link>

            <button
              onClick={logout}
              className="px-4 py-3 rounded-full glass-pill text-xs uppercase tracking-wider text-moon-muted hover:text-rose-400 border border-white/10 hover:border-rose-500/30 flex items-center gap-2 transition"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>


        {/* Active Upcoming Booking Showcase - Collectible Luxury Ticket Stub */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-cinzel text-2xl text-moon-cream font-medium">Your Table Booking</h2>
            <span className="font-mono text-[11px] text-moon-gold/80 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={12} className="text-moon-gold" />
              <span>Digital Sanctuary Pass</span>
            </span>
          </div>

          {activeBooking ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-gradient-to-r from-[#171412] via-[#141210] to-[#0f0e0c] rounded-3xl border border-moon-gold/50 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(212,175,55,0.12)] overflow-hidden flex flex-col md:flex-row items-stretch justify-between group"
            >
              <SpecularGlow />

              {/* Top 24k Gold Foil Trim */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-yellow-200 to-amber-600 shadow-[0_1px_8px_rgba(212,175,55,0.4)] z-10" />

              {/* Top & Bottom Ticket Cutout Notches on Perforation Boundary */}
              <div className="hidden md:block absolute -top-4 right-[270px] w-8 h-8 rounded-full bg-moon-black border border-moon-gold/40 shadow-inner z-20 pointer-events-none" />
              <div className="hidden md:block absolute -bottom-4 right-[270px] w-8 h-8 rounded-full bg-moon-black border border-moon-gold/40 shadow-inner z-20 pointer-events-none" />

              {/* Left / Main Ticket Section */}
              <div className="p-8 md:p-9 space-y-5 flex-1 relative">
                {/* Background Watermark */}
                <div className="absolute right-4 bottom-2 text-moon-gold/[0.03] font-cinzel text-8xl font-bold select-none pointer-events-none">
                  SANCTUARY
                </div>

                {/* Top Badge & Embossed Crest */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-moon-gold bg-moon-gold/10 px-3.5 py-1 rounded-full border border-moon-gold/30 tracking-wider">
                      № {activeBooking.bookingRef}
                    </span>
                    <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle size={13} /> {activeBooking.status || 'Confirmed Pass'}
                    </span>
                  </div>

                  {/* Embossed Holographic Gold Seal */}
                  <div className="flex items-center gap-2.5 bg-gradient-to-r from-amber-500/10 via-yellow-300/10 to-transparent px-3 py-1.5 rounded-full border border-moon-gold/30">
                    <div className="w-5 h-5 rounded-full border border-dashed border-moon-gold animate-[spin_16s_linear_infinite] flex items-center justify-center">
                      <Sparkles size={10} className="text-moon-gold" />
                    </div>
                    <span className="font-mono text-[9px] text-amber-200 tracking-wider uppercase font-semibold">
                      OFFICIAL SANCTUARY PASS • TABLE CONFIRMED
                    </span>
                  </div>
                </div>

                {/* Booking Time Flight Header */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-moon-muted uppercase tracking-[0.2em] block">
                    SEATED RESERVATION FLIGHT
                  </span>
                  <h3 className="font-cinzel text-2xl md:text-3xl text-moon-cream font-medium tracking-wide">
                    {activeBooking.timeSlot}
                  </h3>
                </div>

                {/* Details Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-white/[0.02] p-3 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-moon-muted flex items-center gap-1.5">
                      <Calendar size={13} className="text-moon-gold" /> Date
                    </span>
                    <span className="font-mono text-xs text-moon-cream block font-medium">
                      {activeBooking.date}
                    </span>
                  </div>

                  <div className="bg-white/[0.02] p-3 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-moon-muted flex items-center gap-1.5">
                      <MapPin size={13} className="text-moon-gold" /> Salon Zone
                    </span>
                    <span className="font-sans text-xs text-moon-cream block font-medium capitalize">
                      {activeBooking.zone?.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="bg-white/[0.02] p-3 rounded-2xl border border-white/5 space-y-1 col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-mono uppercase text-moon-muted flex items-center gap-1.5">
                      <Users size={13} className="text-moon-gold" /> Party Size
                    </span>
                    <span className="font-sans text-xs text-moon-cream block font-medium">
                      {activeBooking.guests}
                    </span>
                  </div>
                </div>
              </div>

              {/* Perforated Gold Tear Line (Vertical on Desktop, Horizontal on Mobile) */}
              <div className="relative flex md:flex-col items-center justify-between border-t-2 md:border-t-0 md:border-l-2 border-dashed border-moon-gold/35" />

              {/* Right Stub Section (Validation & QR Action) */}
              <div className="w-full md:w-[270px] bg-black/30 p-8 flex flex-col items-center justify-center text-center space-y-4 shrink-0 relative">
                {/* Mobile Ticket Notches */}
                <div className="md:hidden absolute -left-3.5 top-0 -translate-y-1/2 w-7 h-7 rounded-full bg-moon-black border border-moon-gold/40 shadow-inner z-20 pointer-events-none" />
                <div className="md:hidden absolute -right-3.5 top-0 -translate-y-1/2 w-7 h-7 rounded-full bg-moon-black border border-moon-gold/40 shadow-inner z-20 pointer-events-none" />

                {/* Rotating Embossed Foil Badge */}
                <div
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/20 via-yellow-200/25 to-amber-700/20 border-2 border-dashed border-moon-gold/70 flex items-center justify-center relative shadow-[0_0_15px_rgba(212,175,55,0.3)] group cursor-pointer"
                  onClick={() => {
                    setSelectedPass(activeBooking);
                    setIsPassModalOpen(true);
                  }}
                >
                  <div className="absolute inset-0 rounded-full border border-amber-300/40 animate-[spin_20s_linear_infinite]" />
                  <QrCode size={28} className="text-moon-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-moon-gold uppercase tracking-widest block font-medium">
                    CONCIERGE CHECK-IN
                  </span>
                  <p className="text-[11px] font-sans text-moon-muted">
                    Show QR stub upon entry
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedPass(activeBooking);
                    setIsPassModalOpen(true);
                  }}
                  className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-moon-gold to-amber-400 text-moon-black font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:from-amber-400 hover:to-moon-gold transition duration-300 shadow-xl shadow-moon-gold/25 group"
                >
                  <QrCode size={15} />
                  <span>View Pass</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="glass-card p-8 rounded-3xl border border-white/10 text-center space-y-4 py-12 relative overflow-hidden group">
              <SpecularGlow />
              <div className="relative z-[1] space-y-4">
                <Calendar size={32} className="mx-auto text-moon-gold/40" />
                <p className="font-cinzel text-lg text-moon-cream">No upcoming table bookings</p>
                <p className="font-sans text-xs text-moon-muted max-w-sm mx-auto font-light">
                  Reserve your table for an unhurried, comfortable dining experience.
                </p>
                <Link
                  to="/reservation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-moon-gold text-moon-black text-xs uppercase tracking-wider font-semibold hover:bg-moon-amber transition"
                >
                  <span>Reserve Table</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Past Order History */}
        <div className="space-y-4">
          <h2 className="font-cinzel text-2xl text-moon-cream font-medium">Past Orders</h2>

          <div className="glass-card p-6 rounded-3xl border border-white/10 overflow-x-auto relative overflow-hidden group">
            <SpecularGlow />
            <div className="relative z-[1]">
              {pastOrders.length === 0 ? (
              <p className="text-xs font-sans text-moon-muted text-center py-8">
                No past orders recorded under this account.
              </p>
            ) : (
              <table className="w-full text-left font-sans text-xs">
                <thead className="font-mono text-[11px] text-moon-muted uppercase border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Selected Items</th>
                    <th className="py-3 px-4">Table / Zone</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pastOrders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-white/[0.02]">
                      <td className="py-4 px-4 font-mono text-moon-muted">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 space-y-1">
                        {ord.items?.map((it, idx) => (
                          <div key={idx} className="text-moon-cream">
                            {it.quantity}x {it.name}
                          </div>
                        ))}
                      </td>
                      <td className="py-4 px-4 text-moon-muted">
                        {ord.tableNumber || ord.customerInfo?.tableNo || 'Barista Salon'}
                      </td>
                      <td className="py-4 px-4 font-mono text-moon-gold">
                        ${ord.totalAmount?.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {ord.orderStatus || 'Served'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Digital Pass Modal */}
      <DigitalPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        passData={selectedPass}
      />
    </div>
  );
};

export default UserDashboard;
