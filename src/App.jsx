import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Heart, Star, Sparkles, Music, Gift, Clock, Camera, Video, MessageCircle, Lock, Key, Crown, Flower2, ChevronDown } from "lucide-react";

export default function BirthdayWebsite() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);
  const correctDate = "14-02-2003";
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const sections = [
    "login",
    "opening",
    "celebration",
    "gallery",
    "timeline",
    "loveletter",
    "final"
  ];

  // Animasi parallax untuk background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const starsOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  useEffect(() => {
    // Inisialisasi audio
    audioRef.current = new Audio("/api/placeholder/audio/happy-birthday.mp3");
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
      }
      @keyframes pulse-heart {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
      .animate-spin-slow {
        animation: spin-slow 8s linear infinite;
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      .animate-pulse-heart {
        animation: pulse-heart 1s ease-in-out infinite;
      }
      /* Smooth scroll */
      .scroll-container {
        scroll-behavior: smooth;
      }
      /* Custom scrollbar */
      .scroll-container::-webkit-scrollbar {
        width: 8px;
      }
      .scroll-container::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
      }
      .scroll-container::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #ec4899, #8b5cf6);
        border-radius: 10px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle scroll untuk mendeteksi section
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sectionHeight = container.scrollHeight / sections.length;
      const current = Math.floor(scrollTop / sectionHeight);
      setCurrentSection(Math.min(current, sections.length - 1));

      // Trigger confetti di section celebration
      if (current === 2 && !showConfetti) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sections.length, showConfetti]);

  const scrollToSection = useCallback((index) => {
    const container = containerRef.current;
    if (!container) return;
    
    const sectionHeight = container.scrollHeight / sections.length;
    container.scrollTo({
      top: sectionHeight * index,
      behavior: 'smooth'
    });
  }, [sections.length]);

  // Auto scroll indicator
  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 50) {
        const direction = e.deltaY > 0 ? 1 : -1;
        const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
        scrollToSection(nextSection);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentSection, scrollToSection, sections.length]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100">
      {/* Background Elements dengan Parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 180],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Music Player */}
      <div className="absolute top-6 right-6 z-50">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-lg border-2 ${musicPlaying ? 'bg-pink-500 text-white border-pink-600' : 'bg-white/90 text-pink-600 border-pink-300'}`}
        >
          <Music className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
        <div className="flex flex-col items-center gap-3">
          {sections.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(index)}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`w-3 h-3 rounded-full transition-all ${currentSection === index ? 'bg-pink-500 scale-125' : 'bg-pink-300'}`} />
              {currentSection === index && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-pink-500 blur-md"
                  layoutId="activeDot"
                />
              )}
              <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium text-pink-600">
                  {index === 0 ? "Login" :
                   index === 1 ? "Opening" :
                   index === 2 ? "Celebration" :
                   index === 3 ? "Gallery" :
                   index === 4 ? "Timeline" :
                   index === 5 ? "Love Letter" : "Final"}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-pink-100 z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500"
          style={{ width: `${(currentSection / (sections.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="scroll-container h-full overflow-y-auto snap-y snap-mandatory"
      >
        {/* Section 1: Login */}
        <section className="h-screen w-full snap-start">
          <LoginSection
            name={name}
            setName={setName}
            date={date}
            setDate={setDate}
            correctDate={correctDate}
            onSuccess={() => scrollToSection(1)}
          />
        </section>

        {/* Section 2: Cinematic Opening */}
        <section className="h-screen w-full snap-start">
          <OpeningSection name={name} />
        </section>

        {/* Section 3: Birthday Celebration */}
        <section className="h-screen w-full snap-start">
          <CelebrationSection name={name} />
        </section>

        {/* Section 4: Gallery */}
        <section className="h-screen w-full snap-start">
          <GallerySection name={name} />
        </section>

        {/* Section 5: Timeline */}
        <section className="h-screen w-full snap-start">
          <TimelineSection name={name} />
        </section>

        {/* Section 6: Love Letter */}
        <section className="h-screen w-full snap-start">
          <LoveLetterSection name={name} />
        </section>

        {/* Section 7: Final */}
        <section className="h-screen w-full snap-start">
          <FinalSection
            name={name}
            onPlayAudio={toggleMusic}
            musicPlaying={musicPlaying}
          />
        </section>
      </div>

      {/* Scroll Down Indicator */}
      {currentSection < sections.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-pink-500 mb-2"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-pink-600 shadow-lg">
              Scroll ke bawah
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Login Section
function LoginSection({ name, setName, date, setDate, correctDate, onSuccess }) {
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [hint, setHint] = useState("");

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    setIsIncorrect(value && value !== correctDate);
    
    if (value && value !== correctDate) {
      setHint("❣️ Ingat tanggal spesial kita pertama kali...");
      setTimeout(() => setHint(""), 3000);
    }
  };

  const handleSubmit = () => {
    if (date === correctDate && name.trim()) {
      onSuccess();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center p-6 relative"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mb-4">
          🎀 Gerbang Cinta Kita 🎀
        </h1>
        <p className="text-gray-600 text-xl">Masukkan kode rahasia untuk masuk ke dunia kita berdua</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-pink-300/50"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-pink-700 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 fill-pink-500" />
              💖 Nama Panggilan Spesial Kamu
            </label>
            <input
              type="text"
              placeholder="Contoh: Sayangku, Cintaku, Dede..."
              className="w-full p-4 rounded-2xl border-2 border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all bg-white/70 placeholder:text-pink-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-pink-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              📅 Tanggal Lahir Spesial (DD-MM-YYYY)
            </label>
            <input
              type="text"
              placeholder="Tanggal lahir yang selalu kuingat: 14-02-2003"
              className="w-full p-4 rounded-2xl border-2 border-pink-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all bg-white/70 placeholder:text-pink-300"
              value={date}
              onChange={handleDateChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <AnimatePresence>
            {hint && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-rose-400 text-sm text-center p-3 bg-rose-50 rounded-xl border border-rose-200"
              >
                {hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {date === correctDate && name.trim() && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="w-full mt-6 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white p-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Sparkles className="w-6 h-6" />
              Buka Dunia Cinta Kita ✨
              <Sparkles className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Opening Section
function OpeningSection({ name }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const texts = [
    `Untuk ${name || "sayangku"}...`,
    `Yang membuat setiap detik terasa seperti dongeng indah...`,
    `Dan setiap momen bersamamu adalah cerita terbaik dalam hidupku...`,
    `Kamu adalah alasan mengapa pagi selalu lebih cerah...`,
    `Dan alasan mengapa malam selalu penuh harapan...`
  ];

  useEffect(() => {
    const timers = [];
    let currentIndex = 0;
    
    const showText = (index) => {
      if (index < texts.length) {
        const timer = setTimeout(() => {
          setCurrentTextIndex(index);
          showText(index + 1);
        }, 3000);
        timers.push(timer);
      }
    };
    
    showText(0);
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="h-full flex flex-col items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="mb-12"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
            <Heart className="w-16 h-16 fill-white" />
          </div>
        </motion.div>

        <div className="max-w-3xl text-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentTextIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-4xl md:text-5xl font-light leading-relaxed"
            >
              {texts[currentTextIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16"
        >
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-pink-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Celebration Section
function CelebrationSection({ name }) {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    setIsShaking(true);
    const timer = setTimeout(() => setIsShaking(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full bg-gradient-to-b from-pink-100 to-rose-100 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {["🎉", "🎊", "🎁", "✨"][i % 4]}
          </motion.div>
        ))}
      </div>

      <div className="h-full flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <div className="relative">
            {/* Cake */}
            <div className="w-64 h-64 relative">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-gradient-to-b from-amber-300 to-amber-600 rounded-t-3xl">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-56 h-16 bg-gradient-to-b from-pink-300 to-rose-500 rounded-full"></div>
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-44 h-12 bg-gradient-to-b from-white to-pink-200 rounded-full"></div>
                
                {/* Candles */}
                {[...Array(23)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-full"
                    style={{
                      left: `${(i * 20) % 200}%`,
                      bottom: `${40 + (Math.floor(i / 10) * 20)}%`,
                    }}
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 1 + Math.random(),
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  >
                    <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-red-500 rounded-t-full"></div>
                    <div className="w-3 h-3 bg-yellow-300 rounded-full -mt-1 mx-auto blur-sm"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-6"
        >
          <motion.h1
            animate={isShaking ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0]
            } : {}}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent"
          >
            SELAMAT ULANG TAHUN!
          </motion.h1>
          
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full text-3xl font-bold shadow-lg inline-block">
            🎂 {name || "Sayangku"} yang ke-23 🎂
          </div>
          
          <p className="text-2xl text-gray-700 font-semibold">
            Semoga setiap lilin ini menerangi jalan menuju kebahagiaanmu! 💝
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Gallery Section
function GallerySection({ name }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const albums = {
    album1: {
      id: "album1",
      title: "Momen Pertama Kita",
      date: "14 Februari 2023",
      description: "Hari ketika dunia kita mulai berwarna",
      icon: "💕",
      color: "from-blue-400 to-purple-500",
      memories: [
        { 
          id: 1, 
          type: "photo", 
          title: "Pertama Kali Ketemu",
          caption: "Di kafe favorit kita, malu-malu tapi excited!",
          icon: "📸",
          details: "Tanggal 14 Februari 2023, jam 3 sore. Kamu pakai dress pink yang bikin aku speechless!"
        },
        { 
          id: 2, 
          type: "photo", 
          title: "Makan Bareng Pertama",
          caption: "Spaghetti dan cerita tak berujung",
          icon: "🍝",
          details: "Kamu pesan spaghetti carbonara, aku steak. Kita ngobrol sampai restoran mau tutup!"
        }
      ]
    },
    album2: {
      id: "album2",
      title: "Liburan Pertama",
      date: "Juli 2023",
      description: "Petualangan indah di pantai",
      icon: "🌊",
      color: "from-cyan-400 to-blue-500",
      memories: [
        { 
          id: 1, 
          type: "photo", 
          title: "Sunset di Pantai",
          caption: "Matahari terbenam yang sempurna",
          icon: "🌅",
          details: "Kita duduk di pasir, kamu bilang ini sunset terindah yang pernah kamu lihat"
        },
        { 
          id: 2, 
          type: "video", 
          title: "Video: Main Air",
          caption: "Kamu ketawa sambil lari dari ombak",
          icon: "🏖️",
          details: "Durasi 1:45 - Rambut kamu basah, tapi senyum kamu cerah banget!"
        }
      ]
    },
    album3: {
      id: "album3",
      title: "Ulang Tahun Pertama",
      date: "14 Februari 2024",
      description: "Rayakan cinta kita yang setahun",
      icon: "🎉",
      color: "from-pink-400 to-rose-500",
      memories: [
        { 
          id: 1, 
          type: "photo", 
          title: "Kue Spesial",
          caption: "Kue dengan lilin berbentuk hati",
          icon: "🎂",
          details: "Kamu surprise aku dengan kue buatan kamu sendiri. Manis banget!"
        },
        { 
          id: 2, 
          type: "video", 
          title: "Video: Potong Kue",
          caption: "Momen bahagia bersama",
          icon: "🥳",
          details: "Durasi 3:12 - Kita nyanyi lagu ulang tahun sambil pegang tangan"
        }
      ]
    }
  };

  const handleAlbumClick = (albumId) => {
    setSelectedAlbum(albumId);
    setIsPopupOpen(true);
  };

  return (
    <div className="h-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center p-8">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            📸 Galeri Kenangan Kita
          </h2>
          <p className="text-gray-600 text-xl">Kenangan indah yang selalu menghangatkan hati</p>
        </motion.div>

        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(albums).map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="cursor-pointer"
                onClick={() => handleAlbumClick(album.id)}
              >
                <div className={`h-64 rounded-3xl bg-gradient-to-br ${album.color} p-8 shadow-xl`}>
                  <div className="h-full flex flex-col items-center justify-center text-white text-center">
                    <span className="text-6xl mb-4">{album.icon}</span>
                    <h3 className="text-2xl font-bold mb-2">{album.title}</h3>
                    <p className="opacity-90">{album.date}</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-700">{album.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Album Detail Popup */}
      <AnimatePresence>
        {isPopupOpen && selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-6 bg-gradient-to-r ${albums[selectedAlbum].color} text-white`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">{albums[selectedAlbum].title}</h3>
                    <p className="opacity-90">{albums[selectedAlbum].date}</p>
                  </div>
                  <button onClick={() => setIsPopupOpen(false)} className="text-white hover:text-white/80">
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div className="space-y-4">
                  {albums[selectedAlbum].memories.map((memory) => (
                    <div key={memory.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{memory.icon}</div>
                        <div>
                          <h4 className="font-bold text-gray-800">{memory.title}</h4>
                          <p className="text-gray-600">{memory.caption}</p>
                          <p className="text-sm text-gray-500 mt-1">{memory.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6">
                  <p className="text-gray-700 italic">
                    "Setiap kenangan denganmu adalah harta karun yang tak ternilai, {name}. 
                    Terima kasih telah mengisi hidupku dengan cerita-cerita indah ini."
                  </p>
                  <p className="text-right text-pink-600 font-bold mt-2">- Mas Bagus 💕</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Timeline Section
function TimelineSection({ name }) {
  const [currentYear, setCurrentYear] = useState(2023);

  const timelineEvents = [
    {
      year: 2023,
      events: [
        {
          date: "14 Februari 2023",
          title: "Pertama Kali Bertemu",
          description: "Di kafe kecil yang cozy, kita mulai cerita kita",
          icon: "💕"
        },
        {
          date: "Maret 2023",
          title: "Date Pertama",
          description: "Nonton film dan makan malam pertama",
          icon: "🎬"
        }
      ]
    },
    {
      year: 2024,
      events: [
        {
          date: "14 Februari 2024",
          title: "Ulang Tahun Pertama",
          description: "Rayakan cinta kita yang sudah setahun",
          icon: "🎉"
        },
        {
          date: "Mei 2024",
          title: "Meet the Family",
          description: "Kamu bertemu keluargaku",
          icon: "👨‍👩‍👧‍👦"
        }
      ]
    },
    {
      year: 2025,
      events: [
        {
          date: "14 Februari 2025",
          title: "Ulang Tahun Kedua",
          description: "Cinta kita semakin matang",
          icon: "💝"
        },
        {
          date: "Sekarang",
          title: "Masa Depan Kita",
          description: "Bersama meraih impian",
          icon: "✨"
        }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear((prev) => {
        const years = [2023, 2024, 2025];
        const currentIndex = years.indexOf(prev);
        return years[(currentIndex + 1) % years.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentTimeline = timelineEvents.find(t => t.year === currentYear);

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center p-8">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Timeline Cinta Kita
          </h2>
          <p className="text-gray-600 text-xl">Perjalanan indah kita dari awal hingga sekarang</p>
        </motion.div>

        <div className="w-full max-w-4xl">
          {/* Year Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            {timelineEvents.map(({ year }) => (
              <button
                key={year}
                onClick={() => setCurrentYear(year)}
                className={`px-6 py-3 rounded-full font-bold transition-all ${currentYear === year ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-white text-gray-600'}`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Timeline Content */}
          <motion.div
            key={currentYear}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-2 rounded-full text-xl font-bold">
                Tahun {currentYear}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentTimeline?.events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{event.icon}</div>
                    <div>
                      <p className="text-sm text-pink-500 font-semibold">{event.date}</p>
                      <h4 className="text-xl font-bold text-gray-800 mt-1">{event.title}</h4>
                      <p className="text-gray-600 mt-2">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Personal Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-pink-700">Refleksi Cinta</h4>
                <p className="text-gray-600">Dari Mas Bagus untuk {name || "kekasihku"}</p>
              </div>
            </div>
            <p className="text-gray-700 text-lg">
              "Lihatlah bagaimana perjalanan kita tumbuh dari waktu ke waktu. 
              Setiap tahun bersama kamu adalah tahun yang penuh makna, tawa, dan cinta. 
              Aku bersyukur bisa menjadi bagian dari setiap bab dalam cerita hidupmu."
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Love Letter Section
function LoveLetterSection({ name }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showEnvelope, setShowEnvelope] = useState(true);
  
  const messages = [
    `Untuk ${name || "sayangku"} yang tercinta,`,
    "Di hari ulang tahunmu yang spesial ini, aku ingin mengungkapkan betapa bersyukurnya aku memiliki kamu dalam hidupku.",
    "Kamu adalah cahaya yang menerangi hari-hariku, senyuman yang menghangatkan hatiku, dan cinta yang membuat hidupku bermakna.",
    "Terima kasih telah menjadi pendengar yang sabar, teman yang setia, dan cinta yang tak pernah padam.",
    "Aku mengagumi kekuatanmu, kelembutan hatimu, dan cara unikmu melihat dunia.",
    "Setiap momen bersamamu adalah harta karun yang kusimpan dengan hati-hati dalam memoriku.",
    "Di tahun ke-23 hidupmu ini, aku berdoa agar kamu selalu diberikan kebahagiaan yang tak terhingga,",
    "kesehatan yang prima, dan impian-impian yang terus mekar seperti bunga di musim semi.",
    "Aku akan selalu ada di sini, mendukungmu dalam setiap langkah, merayakan setiap kesuksesanmu,",
    "dan menghiburmu di setiap tantangan yang kamu hadapi.",
    "Karena kamu pantas mendapatkan yang terbaik dari dunia ini.",
    "Dan yang terpenting, terima kasih telah menjadi kamu yang sesungguhnya.",
    "Selamat ulang tahun, cintaku. Aku mencintaimu lebih dari kata-kata bisa ungkapkan."
  ];

  useEffect(() => {
    setShowEnvelope(true);
    const timer = setTimeout(() => {
      setShowEnvelope(false);
      // Tampilkan semua pesan sekaligus setelah envelope terbuka
      setTimeout(() => {
        setVisibleMessages(messages);
      }, 1000);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full bg-gradient-to-b from-rose-100 to-pink-100 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center p-8">
        <AnimatePresence>
          {showEnvelope && (
            <motion.div
              key="envelope"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="text-center"
            >
              <div className="text-8xl mb-6">💌</div>
              <p className="text-2xl text-gray-600">Membuka surat cinta dari Mas Bagus...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!showEnvelope && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-white/95 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-4">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-pink-700">Surat Cinta Untukmu</h3>
                <p className="text-gray-600 mt-2">Ditulis dengan cinta tak terhingga oleh Mas Bagus</p>
              </div>

              <div className="space-y-4">
                {visibleMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 pt-1">
                      <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">{message}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-pink-200">
                <div className="text-right">
                  <p className="text-pink-600 font-bold text-2xl mb-2">
                    Dengan cinta yang abadi,
                  </p>
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-2 rounded-lg inline-block">
                    <p className="text-xl font-bold">Mas Bagus</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Final Section
function FinalSection({ name, onPlayAudio, musicPlaying }) {
  const [showGift, setShowGift] = useState(false);
  
  const handleOpenGift = () => {
    setShowGift(true);
    setTimeout(() => {
      alert(`🎁 Hadiah Virtual untuk ${name || "Sayangku"}:\n\n1. Voucher Spa Day\n2. Romantic Dinner for Two\n3. Weekend Getaway\n4. Personalized Love Book\n5. Surprise Trip!\n\n*Hadiah nyata akan diberikan saat kita bertemu! 💕`);
    }, 500);
  };

  return (
    <div className="h-full bg-gradient-to-b from-purple-100 via-pink-100 to-rose-100 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative mb-12"
        >
          <div className="relative">
            <div className="w-72 h-72 bg-white rounded-full p-4 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex flex-col items-center justify-center">
                <span className="text-8xl mb-4">🎂</span>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-700">Happy Birthday!</p>
                  <p className="text-lg text-gray-600">To My Special Someone</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center space-y-6 max-w-2xl">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
            Selamat Ulang Tahun ke-23!
          </h2>
          
          <p className="text-2xl text-gray-700">
            Untuk <span className="font-bold text-pink-600">{name || "Sayangku"}</span> yang tercinta 💝
          </p>

          <div className="bg-white/90 rounded-2xl p-8 mt-8">
            <h3 className="text-2xl font-bold text-purple-700 mb-6">
              Doa dan Harapan untukmu
            </h3>
            
            <div className="space-y-4 text-left">
              <p className="text-lg text-gray-700">Semoga tahun ini membawa kebahagiaan yang lebih besar dari sebelumnya,</p>
              <p className="text-lg text-gray-700">kesuksesan di setiap usaha yang kamu jalani,</p>
              <p className="text-lg text-gray-700">dan kesehatan yang selalu menyertai langkahmu.</p>
              <p className="text-lg text-gray-700">Semoga semua impian dan cita-citamu perlahan tapi pasti menjadi kenyataan.</p>
            </div>
          </div>
        </div>

        {/* Interactive Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-2xl">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAudio}
            className={`p-6 rounded-2xl font-bold shadow-lg transition-all flex flex-col items-center justify-center gap-3 ${musicPlaying ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'}`}
          >
            <div className="flex items-center gap-3">
              <Music className="w-8 h-8" />
              <span className="text-xl">
                {musicPlaying ? 'Musik Sedang Diputar' : 'Putar Lagu Spesial'}
              </span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenGift}
            className="p-6 rounded-2xl font-bold shadow-lg transition-all flex flex-col items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
          >
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8" />
              <span className="text-xl">
                {showGift ? 'Hadiah Terbuka!' : 'Buka Hadiah Rahasia'}
              </span>
            </div>
          </motion.button>
        </div>

        {/* Final Message */}
        <div className="mt-12 text-center max-w-2xl">
          <p className="text-gray-600 text-lg">
            Website ini dibuat dengan sepenuh hati oleh Mas Bagus,
          </p>
          <p className="text-gray-500 mt-2">
            sebagai bukti cinta yang akan abadi dalam memori digital kita.
          </p>
          <div className="mt-6 text-sm text-gray-400 space-y-1">
            <p>Dibuat khusus untuk {name || "kamu"} di hari ulang tahunmu yang ke-23</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Confetti Component
function Confetti() {
  const confettiColors = [
    '#f472b6', '#ec4899', '#db2777', '#c026d3', '#a855f7',
    '#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4'
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {[...Array(150)].map((_, i) => {
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const size = Math.random() * 10 + 4;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: '50%',
            }}
            initial={{
              y: -50,
              x: Math.random() * 100 - 50,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: ['0vh', '100vh'],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 720],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
