import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  // Booking Engine State
  const today = new Date().toISOString().split("T")[0];
  const [destination, setDestination] = useState("cam-ranh");
  const [checkInDate, setCheckInDate] = useState("2025-04-12");
  const [checkOutDate, setCheckOutDate] = useState("2025-04-16");
  const [guests, setGuests] = useState("2-0-1");

  // VIP Membership Form State
  const [memberFullName, setMemberFullName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Selected Room Modal State
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Selected Experience Modal State
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleBookingSearch = (e) => {
    e.preventDefault();
    navigate(
      `/rooms?destination=${encodeURIComponent(destination)}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${encodeURIComponent(
        guests
      )}`
    );
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (memberEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setMemberFullName("");
        setMemberEmail("");
      }, 5000);
    }
  };

  // 3 Featured Suites Data
  const featuredRooms = [
    {
      id: "oceanfront-villa",
      title: "Oceanfront Pool Villa",
      badge: "Signature Villa",
      featureBadge: "Hồ bơi vô cực riêng",
      featureIcon: "pool",
      size: "180 m²",
      bed: "1 King Bed",
      view: "Trực diện biển",
      description:
        "Biệt thự trực diện biển với hồ bơi tràn bờ riêng tư, sân tắm nắng bằng gỗ teak và lối đi thẳng ra bờ cát trắng mịn.",
      longDescription:
        "Tận hưởng không gian sống hoàng gia bên bờ đại dương nguyên sơ. Biệt thự sở hữu lối kiến trúc mở phóng khoáng, đón trọn từng làn gió mát lành cùng tiếng sóng vỗ rì rào. Mỗi ngày bắt đầu với bữa sáng thượng hạng phục vụ ngay tại hồ bơi tràn bờ riêng biệt.",
      amenities: ["Bữa sáng thượng hạng", "Đưa đón sân bay VIP", "Trà chiều bãi biển"],
      extraAmenities: [
        "Quản gia riêng phục vụ 24/7",
        "Rượu Champagne ướp lạnh khi nhận phòng",
        "Miễn phí 60 phút trị liệu Lotus Spa",
        "Hệ thống âm thanh Bang & Olufsen cao cấp",
      ],
      price: "8.500.000₫",
      priceNumber: 8500000,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPLOPsyl0iDkpOIB-qwsUnCChJjDVA6zyUqED4ptndbLjQ8kbm0pcP40TaShGXJi6Z_8nCkSW0JdJaGdDiYMi6kibsthGLnfFROrjEoF4ftrhTGLuCUVW13k2y_MZluBfhP_IngCQwiu3teAc2OmRmQM23jjOkeC_q1Kf6xXLa1gjHOxGgI_5GaLgYiyUPhYSXhZx1CXM9_KCd9o9bqqJFteScMRw-HMVeUlj5ftz2rdCHAwgLdaiv",
    },
    {
      id: "horizon-grand-suite",
      title: "Horizon Grand Suite",
      badge: "Khuyên Chọn",
      featureBadge: "Bồn tắm Jacuzzi",
      featureIcon: "hot_tub",
      size: "95 m²",
      bed: "1 King Bed",
      view: "Hướng Hoàng Hôn",
      description:
        "Tầm nhìn 180 độ ôm trọn khoảnh khắc hoàng hôn rực rỡ, trang bị bồn tắm sục đôi ngắm vịnh biển thơ mộng.",
      longDescription:
        "Thiết kế mở với kính chạm trần tối tân cho phép thu trọn vẻ đẹp kỳ vĩ của vịnh biển lúc ráng chiều. Điểm nhấn là bồn sục Jacuzzi ngoài ban công riêng tư, nơi quý khách có thể nhâm nhi ly cocktail hoàng hôn trong tiếng nhạc êm dịu.",
      amenities: ["Bữa sáng Buffet", "Cocktail Sunset Bar", "Dịch vụ giặt là nhẹ"],
      extraAmenities: [
        "Dịch vụ trà chiều tại sảnh Executive Lounge",
        "Giường ngủ lò xo đệm lông vũ chuẩn 5 sao",
        "Bồn tắm đôi Jacuzzi hướng biển",
        "Máy pha cà phê Nespresso nguyên bản",
      ],
      price: "4.200.000₫",
      priceNumber: 4200000,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAXFraZvgRHOHAC3zOj8uXwgAq44FVu6mbSZdLi3NzqIMWRIGNaDe-_PxKgHmIl1ii-yG_v70WHkIHPb_Z0y4xeias29MoJ3WmRvErz2keA7_kQqx2svAQs9JWP1ChVfvnf5Apga2ZuxWfsQ8lew3tqnSwR3sl87nM-Tzx2Zux-dsUnq-6pH023wVT867684VnzmSyYCyIS2M2z-YdJfZwX3vtw-5M-b6boORpoK4hC_5GUwatztzkr",
    },
    {
      id: "garden-bungalow",
      title: "Garden Sanctuary Bungalow",
      badge: "An Nhiên & Tĩnh Tại",
      featureBadge: "Vườn Nhiệt Đới",
      featureIcon: "nature_people",
      size: "75 m²",
      bed: "1 King / 2 Twin",
      view: "Hoa cỏ nội khu",
      description:
        "Ẩn mình giữa rừng dương và rặng hoa sứ ngát hương, mang lại không gian thiền định, tách biệt hoàn toàn ồn ào đô thị.",
      longDescription:
        "Bungalow mang phong cách mộc mạc nhưng tinh xảo, hài hòa tuyệt đối với khu vườn nhiệt đới xanh mát. Mỗi sáng thức dậy cùng tiếng chim hót, hít căng lồng ngực bầu không khí trong trẻo và khởi đầu ngày mới cùng lớp Yoga thanh lọc tâm trí.",
      amenities: ["Bữa sáng lành mạnh", "Lớp Yoga sáng sớm", "Xe đạp dạo khu nghỉ"],
      extraAmenities: [
        "Bồn tắm đá tự nhiên lộ thiên ngoài trời",
        "Tinh dầu khuếch tán sả chanh bản địa dịu mát",
        "Miễn phí sử dụng xe đạp phong cách Pháp",
        "Sân hiên gỗ riêng tư có võng đu thư giãn",
      ],
      price: "2.900.000₫",
      priceNumber: 2900000,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDAnjSsCcieEz3l0KdAoBP1KdoVaYRI-BHohhZsWDe7b0Y6xMy_4V7A4vSW68wAof_OHVgQQmeXa2FOWk25PAM7FfP60-_WESoeU8sIdD_mlNApbGxi5fs7EVd-7Z82gG5L4iHUBUEbN1sa2qP20hBH7IDw5wJf79OcyqIbgzRsLE2BjAomj7ibWrSGgjm24ucmFRWmzRPr7MXY_N5jNTVMFkvS3JKqcRvr6o3yHNeUDxJsPPCt4VHJ",
    },
  ];

  // 4 Luxury Experiences
  const luxuryExperiences = [
    {
      id: "spa",
      title: "Lotus Lotus Spa & Wellness",
      tag: "Trị Liệu Trẻ Hóa",
      icon: "spa",
      actionText: "Đặt Lịch Trị Liệu",
      description:
        "Liệu pháp bấm huyệt cổ truyền Việt Nam kết hợp tinh dầu thảo mộc bản địa, giải tỏa mọi căng thẳng.",
      details:
        "Không gian thanh tịnh thơm ngát hương trầm và thảo dược bản địa. Gói chăm sóc bao gồm ngâm chân thảo mộc, xông hơi đá muối Himalaya và mát-xa ấn huyệt phục hồi nguồn năng lượng nguyên bản.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBxL-MYUCVmNGWl4cdVwE01OouMK2An9B42USKcIUfaQSYfqR50oPR7F1zo5EH_wP52JauPXkE_00i3PEcLohdBYXb5eY0We9Vml0YcxnScuIxTyFGglZ1_LaC10l3X_GjZl7VXYhH8_yUNJM1QAGh6T4SQX6vwotuuTmr3OzolYWpslc06tnR_maAw9s5z1vj56Ucoszk3j8gmINq_qsaB2iaDcLp2SUtTT9Y618bOAy1yJZp3cgnE",
    },
    {
      id: "dining",
      title: "Nhà Hàng Biển 'The Azure'",
      tag: "Hải Sản Fine Dining",
      icon: "restaurant",
      actionText: "Khám Phá Thực Đơn",
      description:
        "Bữa tiệc vị giác với hải sản tươi đánh bắt trong ngày, chuẩn bị bởi các bếp trưởng đạt sao Michelin danh tiếng.",
      details:
        "Thực đơn à la carte thượng hạng với tôm hùm Cam Ranh bỏ lò bơ tỏi, sò điệp Nhật áp chảo sốt nghệ tây, cùng bộ sưu tập hơn 200 dòng vang Grand Cru trứ danh thế giới.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHmiPoX2iQJ9l_TM51YBxabGIxnUsa-HQcS4YsA19KIDYLEeAFXc0QNM6p6a1QrWb1Kpy8qwpaA3CpcN_X5koqgigPeA9Mk0zeg91-GojufRtqwZp1PKZkPIyAEhrY8FaX-rGuXjeUWh_GlMKhmbHPljPx_F6cmBMTT-TGExKG3WwSXTQFAiTti4cOZILZrq-_jYQOCP4-zy-6PaNmxw9GjVIUIasFcIYfCx1cSKb4rhgCj1j4veSf",
    },
    {
      id: "pool",
      title: "Hồ Bơi Vô Cực Đa Tầng",
      tag: "Thư Giãn Đỉnh Cao",
      icon: "waves",
      actionText: "Xem Tiện Ích Hồ Bơi",
      description:
        "Cụm 3 hồ bơi nước mặn và nước ngọt nhìn thẳng ra đường chân trời biển rộng, thưởng thức cocktail sảng khoái.",
      details:
        "Khu phức hợp hồ bơi thác tràn 3 tầng với mặt nước phẳng lặng soi bóng bầu trời. Quầy bar chìm 'Aqua Pool Bar' phục vụ mocktail nhiệt đới, rượu vang sủi và các món ăn nhẹ hảo hạng từ 7:00 đến 22:00 mỗi ngày.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuATN_K29eq0nN90ls0zbOerQrzd77gWzcTI1ge9jqtLPyTtqKxMk9G4Xp5WEqJ6YIBy8yiH55p4Pj2J455LtfRFzsL8wbs8NaVVARZg3dGvEjoLfuglQudld-XmdukQFOuqPUbJtjV--0GUqFWhYLvG9DMcuV8GdGShK_h0mVEg3QaINMISh4xCnSn0vkTSFnxEsbATvEZY-yM81ozVDWcEbOaOZG6i7qzavM7D4-ny23N2KUuQMkgQ",
    },
    {
      id: "yacht",
      title: "Du Thuyền Hoàng Hôn VIP",
      tag: "Du Thuyền Riêng Biệt",
      icon: "sailing",
      actionText: "Đặt Chuyến Hải Trình",
      description:
        "Hành trình lướt sóng ngắm ráng chiều tuyệt mỹ trên vịnh biển, kèm rượu vang Champagne và đồ ăn canapé cao cấp.",
      details:
        "Chuyến hải trình 3 giờ ngắm hoàng hôn trên du thuyền hai thân Catamaran hiện đại. Đội ngũ thủy thủ đoàn tận tâm, phục vụ tiệc canapé lạnh và sâm-panh Moët & Chandon trong ánh hoàng hôn rực rỡ vịnh biển.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCAQUy4OF0tPLgscLLyTqWROTmbeorgyc9auXVCPb5-9X6-SgCB2vLua3yt076QqOc4-VwE9YA9AWiYELYF-UoeFUU6ei-r-Hytt_dicZX6xsPRyvOGYGWjpjxpQd9K29pJlCDFet3O0vBV1uSgK120iwFBFTJFw2Wf2YFP8FErl2CEl_HMOM060P8Uqw7OhjUVptL_rkwHO1D69Q1rNxDZ5PBEll7wOMqyrndHknruuE8jzLKxmXfw",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full -mt-20 pt-32 pb-24 lg:pb-32 overflow-hidden flex flex-col justify-between min-h-[942px]">
        {/* Panoramic Background Image with Scrim */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-20"
          data-alt="Ultra luxury beachfront tropical resort at twilight sunset with panoramic infinity pool overlooking calm turquoise sea"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.4), rgb(248, 249, 255)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4A4exAoc3PFa1JgtyY3v3Ut-deRiUlwhvFyGDdRxhssDX78lADMhWYewesaZyDUTfHZrnrF2MoDeJ1vB8ErjpFs4edClmA64GOjKtEmbdySx6pTQR1kiLpU89_nNfxPzdUMXw2HP_eW32LPezrtcTZTm3a-mQqeNI6UIiZTm9SvH6lchHIqv481UzJkwRTWGdQcya9R2mSMb0_AS_eI6r7axHoPmflkAXAxkNXKwvw9q7zAEcJigX")`,
          }}
        ></div>

        {/* Atmospheric Ambient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-container/90 via-primary-container/40 to-background -z-10"></div>
        <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none -z-10"></div>

        {/* Hero Content Header */}
        <div className="w-full px-margin max-w-7xl mx-auto text-center flex flex-col items-center pt-8 pb-12">
          {/* Elite Badge */}
          <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-sm mb-space-lg animate-fade-in">
            <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              Thương Hiệu Nghỉ Dưỡng Thượng Lưu Hàng Đầu Châu Á 2024
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-display-lg text-[42px] sm:text-[54px] md:text-[64px] lg:text-[76px] xl:text-[84px] text-surface-container-lowest tracking-tight max-w-5xl drop-shadow-lg mb-space-md leading-[1.1]">
            Kỳ Nghỉ Thượng Lưu <br className="hidden sm:inline" />
            <span className="italic font-normal text-secondary-fixed-dim">Bên Bờ Biển</span> Thiên Đường
          </h1>

          {/* Editorial Subtitle */}
          <p className="font-body-lg text-body-lg md:text-[17px] text-surface-container-lowest max-w-3xl text-center leading-relaxed drop-shadow-md">
            Trải nghiệm dịch vụ cá nhân hóa chuẩn 5 sao quốc tế, nghệ thuật ẩm thực tinh tế và không gian tĩnh tại tuyệt đối giữa thiên nhiên nguyên sơ Cam Ranh, Phú Quốc &amp; Đà Nẵng.
          </p>
        </div>

        {/* Floating Quick Booking Engine */}
        <div className="w-full px-margin max-w-6xl mx-auto mt-4">
          <div className="bg-surface-container-lowest/95 backdrop-blur-xl rounded-xl shadow-xl p-space-md lg:p-space-lg">
            <form
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-md items-end"
              onSubmit={handleBookingSearch}
            >
              {/* Destination Field */}
              <div className="lg:col-span-3 flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                  Điểm Đến &amp; Chi Nhánh
                </label>
                <div className="relative bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between">
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent font-title-md text-title-md text-on-surface focus:outline-none cursor-pointer appearance-none pr-6"
                  >
                    <option value="phu-quoc">Grand Horizon Phú Quốc Oasis</option>
                    <option value="cam-ranh">Grand Horizon Cam Ranh Sanctuary</option>
                    <option value="da-nang">Grand Horizon Đà Nẵng Heritage</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 pointer-events-none text-on-surface-variant text-[18px]">
                    arrow_drop_down
                  </span>
                </div>
              </div>

              {/* Date Check-in & Check-out */}
              <div className="lg:col-span-4 flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-secondary">calendar_today</span>
                  Thời Gian Lưu Trú
                </label>
                <div className="grid grid-cols-2 gap-space-xs bg-surface-container-low rounded-lg p-space-sm">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline">Nhận phòng</span>
                    <input
                      className="bg-transparent font-title-md text-title-md text-on-surface focus:outline-none cursor-pointer text-[14px]"
                      type="date"
                      value={checkInDate}
                      min={today}
                      onChange={(e) => {
                        setCheckInDate(e.target.value);
                        if (checkOutDate <= e.target.value) {
                          setCheckOutDate(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col pl-2 border-l border-surface-container-high">
                    <span className="font-label-sm text-label-sm text-outline">Trả phòng</span>
                    <input
                      className="bg-transparent font-title-md text-title-md text-on-surface focus:outline-none cursor-pointer text-[14px]"
                      type="date"
                      value={checkOutDate}
                      min={checkInDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Guests & Rooms */}
              <div className="lg:col-span-3 flex flex-col gap-space-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-secondary">group</span>
                  Số Khách &amp; Buồng Phòng
                </label>
                <div className="relative bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent font-title-md text-title-md text-on-surface focus:outline-none cursor-pointer appearance-none pr-6"
                  >
                    <option value="2-0-1">2 Người lớn • 1 Phòng</option>
                    <option value="2-1-1">2 Người lớn, 1 Bé • 1 Phòng</option>
                    <option value="4-2-2">4 Người lớn • Villa 2 Phòng</option>
                    <option value="6-3-3">Biệt thự Tổng Thống (VIP)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 pointer-events-none text-on-surface-variant text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Submit Action Button */}
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="w-full h-14 rounded-lg bg-secondary hover:bg-on-secondary-container text-on-secondary flex items-center justify-center gap-space-xs font-label-lg text-label-lg transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                  <span>Tìm Phòng Trống</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF & STATS STRIP */}
      <section className="w-full py-space-xl bg-surface-container-lowest shadow-sm">
        <div className="w-full px-margin max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center divide-x-0 md:divide-x divide-surface-container">
            {/* Metric 1 */}
            <div className="flex flex-col items-center justify-center p-space-md">
              <div className="flex items-center gap-space-xs mb-space-xs">
                <span className="font-display-sm text-display-sm text-on-surface">4.9</span>
                <span className="text-secondary text-headline-sm font-headline-sm">★</span>
              </div>
              <span className="font-title-md text-title-md text-on-surface font-semibold">Đánh Giá TripAdvisor</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Dựa trên 2.450+ đánh giá xác thực
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center justify-center p-space-md">
              <div className="flex items-center gap-space-xs mb-space-xs">
                <span className="font-display-sm text-display-sm text-on-surface">98.4</span>
                <span className="text-secondary text-headline-sm font-headline-sm">%</span>
              </div>
              <span className="font-title-md text-title-md text-on-surface font-semibold">Hài Lòng Tuyệt Đối</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Khách quay lại nghỉ dưỡng hàng năm
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center justify-center p-space-md">
              <div className="flex items-center gap-space-xs mb-space-xs text-secondary">
                <span className="material-symbols-outlined text-[36px]">concierge</span>
              </div>
              <span className="font-title-md text-title-md text-on-surface font-semibold">Quản Gia 24/7 Riêng</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Chuẩn mực dịch vụ Hoàng gia riêng biệt
              </span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-center justify-center p-space-md">
              <div className="flex items-center gap-space-xs mb-space-xs">
                <span className="font-display-sm text-display-sm text-on-surface">1.2</span>
                <span className="text-secondary font-title-lg text-title-lg font-bold self-end mb-1">KM</span>
              </div>
              <span className="font-title-md text-title-md text-on-surface font-semibold">Bãi Biển Độc Quyền</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Bờ cát mịn tự nhiên &amp; biển ngọc lam
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ROOMS & SUITES (Bento editorial showcase) */}
      <section className="w-full py-space-xl bg-background">
        <div className="w-full px-margin max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                Không Gian Nghỉ Dưỡng Thượng Đỉnh
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
                Bộ Sưu Tập Biệt Thự &amp; Phòng Suite
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Mỗi không gian là một tác phẩm kiến trúc hòa quyện cùng thiên nhiên nhiệt đới, kiến tạo sự riêng tư vô hạn và thư thái an nhiên.
            </p>
          </div>

          {/* Suite Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {featuredRooms.map((room) => (
              <div
                key={room.id}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={room.image}
                    alt={room.title}
                    data-alt={room.title}
                  />
                  <div className="absolute top-space-sm left-space-sm px-space-sm py-space-xs bg-primary-container/90 backdrop-blur-md rounded text-secondary-fixed font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                    {room.badge}
                  </div>
                  <div className="absolute bottom-space-sm right-space-sm px-space-sm py-space-xs bg-surface-container-lowest/90 backdrop-blur-md rounded-lg font-label-sm text-label-sm text-on-surface flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-[16px]">{room.featureIcon}</span>
                    {room.featureBadge}
                  </div>
                </div>

                <div className="p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm mb-space-xs">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-secondary">straighten</span>
                        {room.size}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span>
                        {room.bed}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          {room.id === "oceanfront-villa"
                            ? "visibility"
                            : room.id === "horizon-grand-suite"
                            ? "wb_twilight"
                            : "yard"}
                        </span>
                        {room.view}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors mb-space-xs">
                      {room.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                      {room.description}
                    </p>

                    {/* Included amenities */}
                    <div className="flex flex-wrap gap-space-xs mb-space-lg">
                      {room.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-space-xs py-0.5 rounded bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-space-md border-t border-surface-container-high flex items-center justify-between mt-auto">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline block">Giá chỉ từ</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-title-lg text-title-lg text-on-surface font-bold">{room.price}</span>
                        <span className="font-body-sm text-body-sm text-outline">/đêm</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <button
                        onClick={() => setSelectedRoom(room)}
                        className="px-space-md py-space-sm rounded-lg bg-surface-container-high hover:bg-secondary-container text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
                        type="button"
                      >
                        Chi Tiết
                      </button>
                      <button
                        onClick={() => navigate(`/rooms?suite=${encodeURIComponent(room.title)}`)}
                        className="px-space-md py-space-sm rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container font-label-md text-label-md transition-colors shadow-sm cursor-pointer"
                        type="button"
                      >
                        Đặt Ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section CTA */}
          <div className="mt-space-xl text-center">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-space-sm px-space-xl py-space-md rounded-lg bg-surface-container-lowest text-secondary font-label-lg text-label-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Xem Toàn Bộ 12 Hạng Phòng &amp; Biệt Thự</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. LUXURY EXPERIENCES (Dịch Vụ & Tiện Ích Độc Quyền) */}
      <section id="dich-vu-tien-ich" className="w-full py-space-xl bg-surface-container-low scroll-mt-20">
        <div className="w-full px-margin max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              Đặc Quyền Nghỉ Dưỡng
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
              Trải Nghiệm Thượng Lưu Độc Bản
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              Mỗi khoảnh khắc tại Grand Horizon được thêu dệt tỉ mỉ, đánh thức trọn vẹn năm giác quan bằng sự thăng hoa văn hóa và tiện nghi vượt bậc.
            </p>
          </div>

          {/* Bento-style 4 Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {luxuryExperiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:-translate-y-1.5 transition-transform duration-300 flex flex-col"
              >
                <div className="h-52 w-full overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover"
                    src={exp.image}
                    alt={exp.title}
                    data-alt={exp.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-surface-container-lowest font-label-md text-label-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-[18px]">{exp.icon}</span>
                    {exp.tag}
                  </span>
                </div>
                <div className="p-space-md flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-space-xs">
                      {exp.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{exp.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedExperience(exp)}
                    className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-on-secondary-container mt-space-md pt-space-xs cursor-pointer text-left focus:outline-none"
                    type="button"
                  >
                    {exp.actionText} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS & VIP MEMBERSHIP ENROLLMENT */}
      <section id="uu-dai-hoi-vien" className="w-full py-space-xl bg-background scroll-mt-20">
        <div className="w-full px-margin max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Testimonials Left Panel (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                  Chia Sẻ Từ Thượng Khách
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
                  Dấu Ấn Kỷ Niệm Khó Phai
                </h2>
              </div>

              {/* Testimonial Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex text-secondary mb-space-sm text-[16px]">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-md">
                      "Kỳ nghỉ tuần trăng mật vượt ngoài mong đợi. Đội ngũ quản gia thấu hiểu từng thói quen nhỏ nhất, từ loại gối lông vũ đến sở thích thưởng thức bữa sáng bên bờ sóng vỗ."
                    </p>
                  </div>
                  <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container font-label-md text-label-md">
                      TH
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface font-semibold leading-tight">
                        TS. Trần Hoàng &amp; Phu Nhân
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">
                        Oceanfront Villa • Tháng 01/2025
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex text-secondary mb-space-sm text-[16px]">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant italic mb-space-md">
                      "Không gian tĩnh mịch và dịch vụ chuẩn mực 5 sao đích thực. Nhà hàng The Azure phục vụ món tôm hùm sốt bơ nướng ngon nhất tôi từng thưởng thức tại châu Á."
                    </p>
                  </div>
                  <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container font-label-md text-label-md">
                      ML
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface font-semibold leading-tight">
                        Madame Mai Lan
                      </span>
                      <span className="font-label-sm text-label-sm text-outline">
                        Grand Suite • Hội Viên Elite Black
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-space-lg pt-space-xs text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[24px]">verified_user</span>
                  <span className="font-label-sm text-label-sm">Bảo lưu và hoàn cọc linh hoạt 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[24px]">lock</span>
                  <span className="font-label-sm text-label-sm">Thanh toán bảo mật chuẩn SSL 256-bit</span>
                </div>
              </div>
            </div>

            {/* VIP Club Membership Box (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative bg-primary-container text-surface-container-lowest p-space-xl rounded-xl overflow-hidden shadow-xl">
                {/* Decorative Gold Glow */}
                <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-secondary/30 blur-2xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-secondary-container/20 flex items-center justify-center mb-space-md">
                    <span className="material-symbols-outlined text-secondary-fixed text-[28px]">stars</span>
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed font-bold">
                    Grand Horizon Elite Club
                  </span>
                  <h3 className="font-headline-md text-headline-md text-surface-container-lowest mt-1 mb-space-xs">
                    Đăng Ký Hội Viên &amp; Nhận Ngay Ưu Đãi 10%
                  </h3>
                  <p className="font-body-sm text-body-sm text-primary-fixed-dim mb-space-lg">
                    Đặc quyền nhận chiết khấu trực tiếp trên giá phòng, nâng cấp hạng phòng miễn phí tùy tình trạng và thưởng thức dịch vụ đưa đón bằng xe riêng Limousine.
                  </p>

                  {/* Inline Subscription Form */}
                  <form className="flex flex-col gap-space-sm" onSubmit={handleSubscribe}>
                    <div className="flex flex-col gap-1">
                      <input
                        className="w-full h-12 px-space-md rounded-lg bg-surface-container-lowest/10 text-surface-container-lowest placeholder-primary-fixed-dim text-body-md focus:outline-none focus:bg-surface-container-lowest/20 transition-all border border-transparent focus:border-secondary-fixed"
                        placeholder="Họ và tên của Quý khách"
                        type="text"
                        value={memberFullName}
                        onChange={(e) => setMemberFullName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <input
                        className="w-full h-12 px-space-md rounded-lg bg-surface-container-lowest/10 text-surface-container-lowest placeholder-primary-fixed-dim text-body-md focus:outline-none focus:bg-surface-container-lowest/20 transition-all border border-transparent focus:border-secondary-fixed"
                        placeholder="Địa chỉ email cá nhân"
                        type="email"
                        required
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                      />
                    </div>
                    <button
                      className="w-full h-12 mt-space-xs rounded-lg bg-secondary text-on-secondary font-label-lg text-label-lg hover:bg-secondary-container hover:text-on-secondary-container transition-all flex items-center justify-center gap-space-xs shadow-md cursor-pointer"
                      type="submit"
                    >
                      <span>Trở Thành Hội Viên Thượng Lưu</span>
                      <span className="material-symbols-outlined text-[18px]">card_membership</span>
                    </button>

                    {subscribed && (
                      <div className="p-3 bg-on-tertiary-container/20 border border-on-tertiary-container text-on-tertiary-container rounded-lg text-sm font-semibold flex items-center justify-center gap-2 mt-2 animate-fade-in">
                        <CheckCircle2 className="w-5 h-5" />
                        Chúc mừng Quý khách! Đã kích hoạt thẻ hội viên Elite Club thành công.
                      </div>
                    )}
                  </form>
                  <p className="font-label-sm text-label-sm text-on-primary-container text-center mt-space-md">
                    Không thu phí thường niên • Hủy đăng ký nhận thư bất kỳ lúc nào
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modal: Room Details Quick View */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-surface-container-high relative">
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur text-on-surface hover:bg-surface-container-high flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={selectedRoom.image}
                alt={selectedRoom.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary-container/90 backdrop-blur rounded text-secondary-fixed font-label-sm font-semibold uppercase tracking-wider">
                {selectedRoom.badge}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 text-on-surface-variant font-body-sm mb-2">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">straighten</span>
                  {selectedRoom.size}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span>
                  {selectedRoom.bed}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
                  {selectedRoom.view}
                </span>
              </div>

              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                {selectedRoom.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
                {selectedRoom.longDescription}
              </p>

              <h4 className="font-title-md text-title-md text-on-surface mb-2 font-semibold">
                Đặc Quyền Bao Gồm
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {[...selectedRoom.amenities, ...selectedRoom.extraAmenities].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-surface-container-high flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm text-outline block">Giá công bố</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-title-lg text-title-lg text-on-surface font-bold">
                      {selectedRoom.price}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">/đêm</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const suiteParam = encodeURIComponent(selectedRoom.title);
                    setSelectedRoom(null);
                    navigate(`/rooms?suite=${suiteParam}`);
                  }}
                  className="px-6 py-3 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container font-label-lg text-label-lg transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  <span>Đặt Phòng Ngay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal: Luxury Experience Quick View */}
      {selectedExperience && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-surface-container-high relative">
            <button
              onClick={() => setSelectedExperience(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur text-on-surface hover:bg-surface-container-high flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={selectedExperience.image}
                alt={selectedExperience.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-surface-container-lowest flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">
                  {selectedExperience.icon}
                </span>
                <span className="font-title-lg text-title-lg font-semibold">{selectedExperience.tag}</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                {selectedExperience.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
                {selectedExperience.details}
              </p>

              <div className="p-4 rounded-xl bg-surface-container-low mb-6 border border-surface-container">
                <div className="flex items-center gap-2 text-secondary font-semibold font-label-md mb-1">
                  <span className="material-symbols-outlined text-[20px]">room_service</span>
                  Dịch Vụ Quản Gia &amp; Concierge Riêng
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Quý khách có thể yêu cầu đặt chỗ trước qua tổng đài <strong>1900 6868</strong> hoặc liên hệ quản gia phòng để được ưu tiên sắp xếp bàn và khung giờ theo sở thích.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md transition-colors cursor-pointer"
                  type="button"
                >
                  Đóng
                </button>
                <a
                  href="tel:19006868"
                  className="px-5 py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container font-label-md transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Gọi Hotline 1900 6868</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
