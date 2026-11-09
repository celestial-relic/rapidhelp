import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { Professional } from '../../types';
import {
  Search,
  Filter,
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react';

export const FindServices: React.FC = () => {
  const {
    professionals,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    maxDistanceFilter,
    setMaxDistanceFilter,
    maxPriceFilter,
    setMaxPriceFilter,
    minRatingFilter,
    setMinRatingFilter,
    availabilityFilter,
    setAvailabilityFilter,
    customerLocation,
    setSelectedProForBooking,
    setBookingModalOpen,
    setSelectedProForProfile,
    setProProfileModalOpen,
  } = useRapidhelp();

  const [sortBy, setSortBy] = useState<'recommended' | 'distance' | 'rating' | 'price'>(
    'recommended'
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter professionals
  const filteredPros = professionals.filter((pro) => {
    // Search text match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = pro.name.toLowerCase().includes(q);
      const matchCat = pro.category.toLowerCase().includes(q);
      const matchSkills = pro.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchSkills) return false;
    }

    // Category match
    if (selectedCategoryFilter !== 'all') {
      const catObj = categories.find((c) => c.id === selectedCategoryFilter);
      if (catObj && pro.category.toLowerCase() !== catObj.name.toLowerCase()) {
        return false;
      }
    }

    // Distance match
    if (pro.distanceKm > maxDistanceFilter) return false;

    // Price match
    if (pro.startingPrice > maxPriceFilter) return false;

    // Rating match
    if (pro.rating < minRatingFilter) return false;

    // Availability match
    if (availabilityFilter === 'available' && !pro.isAvailable) return false;
    if (availabilityFilter === 'verified' && !pro.isVerified) return false;

    return true;
  });

  // Sort
  const sortedPros = [...filteredPros].sort((a, b) => {
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.startingPrice - b.startingPrice;
    return b.reviewCount - a.reviewCount; // recommended
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryFilter('all');
    setMaxDistanceFilter(15);
    setMaxPriceFilter(1500);
    setMinRatingFilter(4.0);
    setAvailabilityFilter('all');
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Main Search Input */}
          <div className="flex items-center space-x-2 px-3.5 py-2.5 bg-[#F5F7FA] rounded-2xl flex-1 border border-[#E2E8F0]">
            <Search className="w-4 h-4 text-[#64748B] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by technician name, trade (Electrician, Plumber), or specific repair..."
              className="w-full bg-transparent text-xs sm:text-sm text-[#0C1C34] placeholder-[#64748B] focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-xs text-[#64748B] hover:text-[#0C1C34]">
                Clear
              </button>
            )}
          </div>

          {/* Quick Category Select */}
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-[#F5F7FA] rounded-2xl border border-[#E2E8F0] text-xs font-semibold text-[#0C1C34] focus:outline-none"
          >
            <option value="all">All Service Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3.5 py-2.5 bg-[#F5F7FA] rounded-2xl border border-[#E2E8F0] text-xs font-semibold text-[#0C1C34] focus:outline-none"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="distance">Sort: Closest Distance</option>
            <option value="rating">Sort: Highest Rating</option>
            <option value="price">Sort: Lowest Starting Price</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-4 py-2.5 bg-[#0C1C34] text-white rounded-2xl text-xs font-bold flex items-center justify-center space-x-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Desktop Filter Sliders & Chips Bar */}
        <div className={`pt-3 border-t border-[#E2E8F0] ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Distance Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#0C1C34] mb-1">
                <span>Distance Radius</span>
                <span className="text-[#FF7518]">{maxDistanceFilter} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={maxDistanceFilter}
                onChange={(e) => setMaxDistanceFilter(Number(e.target.value))}
                className="w-full accent-[#FF7518] cursor-pointer"
              />
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#0C1C34] mb-1">
                <span>Max Starting Price</span>
                <span className="text-[#FF7518]">₹{maxPriceFilter}</span>
              </div>
              <input
                type="range"
                min="199"
                max="2000"
                step="50"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-[#FF7518] cursor-pointer"
              />
            </div>

            {/* Minimum Rating */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#0C1C34] mb-1">
                <span>Min Rating</span>
                <span className="text-amber-500 font-bold">{minRatingFilter} ★ & above</span>
              </div>
              <div className="flex space-x-1">
                {[4.0, 4.5, 4.8].map((rt) => (
                  <button
                    key={rt}
                    onClick={() => setMinRatingFilter(rt)}
                    className={`flex-1 py-1 text-[11px] rounded-lg font-bold border transition-colors ${
                      minRatingFilter === rt
                        ? 'bg-[#0C1C34] text-white border-[#0C1C34]'
                        : 'bg-[#F5F7FA] text-[#64748B] border-[#E2E8F0]'
                    }`}
                  >
                    {rt}★
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter Chips & Reset */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex space-x-1">
                <button
                  onClick={() => setAvailabilityFilter('all')}
                  className={`px-2.5 py-1.5 text-[11px] font-bold rounded-lg border transition-colors ${
                    availabilityFilter === 'all'
                      ? 'bg-[#FF7518] text-white border-[#FF7518]'
                      : 'bg-[#F5F7FA] text-[#64748B] border-[#E2E8F0]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setAvailabilityFilter('available')}
                  className={`px-2.5 py-1.5 text-[11px] font-bold rounded-lg border transition-colors ${
                    availabilityFilter === 'available'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-[#F5F7FA] text-[#64748B] border-[#E2E8F0]'
                  }`}
                >
                  Online Now
                </button>
              </div>

              <button
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-[#64748B] hover:text-[#0C1C34] flex items-center space-x-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-[#64748B]">
          Showing <span className="font-bold text-[#0C1C34]">{sortedPros.length}</span> verified professionals near{' '}
          <span className="font-bold text-[#0C1C34]">{customerLocation}</span>
        </div>
      </div>

      {/* Nearby Professionals Cards Grid */}
      {sortedPros.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPros.map((pro: Professional) => (
            <div
              key={pro.id}
              className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#FF7518]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Avatar, Name, Verified Badge, Status Pill */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-[#FF7518] transition-colors"
                    />
                    {pro.isVerified && (
                      <div
                        className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white"
                        title="Verified Background"
                      >
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        pro.isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {pro.isAvailable ? '● Online Now' : '○ Busy'}
                    </span>

                    {pro.badge && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-500" />
                        {pro.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pro Identity */}
                <h3 className="text-base font-bold text-[#0C1C34] group-hover:text-[#FF7518] transition-colors">
                  {pro.name}
                </h3>
                <div className="text-xs text-[#64748B] mb-2">{pro.title}</div>

                {/* Metrics Pill (Rating, Distance, Experience) */}
                <div className="flex items-center space-x-3 text-xs mb-4 text-[#64748B]">
                  <span className="flex items-center space-x-1 font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{pro.rating}</span>
                    <span className="text-[#64748B] font-normal">({pro.reviewCount})</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7518]" />
                    <span>{pro.distanceKm} km</span>
                  </span>
                  <span>•</span>
                  <span>{pro.experienceYears}y exp</span>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {pro.skills.slice(0, 3).map((sk, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-[#F5F7FA] text-[#0C1C34] text-[10px] font-medium border border-slate-200/60"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer: Price & Buttons */}
              <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block">
                      Starting Price
                    </span>
                    <span className="text-base font-black text-[#0C1C34]">₹{pro.startingPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold block">
                      Hourly Rate
                    </span>
                    <span className="text-xs font-bold text-[#64748B]">₹{pro.hourlyRate}/hr</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedProForProfile(pro);
                      setProProfileModalOpen(true);
                    }}
                    className="py-2.5 px-3 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#0C1C34] hover:bg-[#F5F7FA] transition-colors"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProForBooking(pro);
                      setBookingModalOpen(true);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#FF7518] hover:bg-[#E8630A] text-white text-xs font-bold shadow-md shadow-[#FF7518]/20 transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] space-y-3">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-[#0C1C34]">No Professionals Match Your Filters</h4>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Try expanding your distance radius slider or clearing the specific category keyword.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-[#0C1C34] text-white text-xs font-bold rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
