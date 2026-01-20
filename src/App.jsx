import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Sparkles, Music, Gift, X, Clock, Camera, Video, MessageCircle, Lock, Key, Crown, Flower2 } from "lucide-react";

export default function BirthdayWebsite() {
  const [scene, setScene] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const correctDate = "14-02-2003"; // Ganti dengan tanggal lahir pacarmu

  const next = () => {
    if (scene < 6) {
      setScene(scene + 1);
    }
  };

  const prev = () => {
    if (scene > 0) {
      setScene(scene - 1);
    }
  };

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
    if (scene === 2) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [scene]);

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
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const renderScene = () => {
    switch(scene) {
      case 0:
        return (
          <Scene0 
            key="scene0"
            name={name}
            setName={setName}
            date={date}
            setDate={setDate}
            correctDate={correctDate}
            next={next}
          />
        );
      case 1:
        return <Scene1 key="scene1" name={name} next={next} />;
      case 2:
        return <Scene2 key="scene2" name={name} next={next} />;
      case 3:
        return <GalleryScene key="scene3" name={name} onNext={next} />;
      case 4:
        return <TimelineScene key="scene4" name={name} onNext={next} />;
      case 5:
        return <LoveLetterScene key="scene5" name={name} onNext={next} />;
      case 6:
        return <FinalScene key="scene6" name={name} onPlayAudio={toggleMusic} musicPlaying={musicPlaying} />;
      default:
        return <Scene0 
          key="scene0-default"
          name={name}
          setName={setName}
          date={date}
          setDate={setDate}
          correctDate={correctDate}
          next={next}
        />;
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100 overflow-hidden relative font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 left-10 w-24 h-24 bg-pink-300 rounded-full opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 right-20 w-32 h-32 bg-purple-300 rounded-full opacity-15"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        ></motion.div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-rose-300 rounded-full opacity-15"></div>
        
        {/* Floating hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            style={{
              left: `${(i * 12) % 100}%`,
              top: `${(i * 15) % 100}%`,
              fontSize: `${Math.random() * 24 + 16}px`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Music Player */}
      <div className="absolute top-4 left-4 z-20">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm ${musicPlaying ? 'bg-pink-500 text-white' : 'bg-white/80 text-pink-600'}`}
        >
          <Music className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Navigation Controls */}
      {scene > 0 && scene < 6 && (
        <div className="absolute top-4 left-20 z-20">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-pink-200 text-pink-600 flex items-center gap-2 text-sm font-medium"
          >
            ← Kembali
          </motion.button>
        </div>
      )}

      {/* Scene Indicator */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-pink-200">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${scene === index ? 'bg-pink-500 scale-125' : 'bg-pink-200'}`}
              animate={scene === index ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {renderScene()}
      </AnimatePresence>
    </div>
  );
}

// SCENE 0: Login Page dengan Personal Touch
function Scene0({ name, setName, date, setDate, correctDate, next }) {
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [hint, setHint] = useState("");

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    setIsIncorrect(value && value !== correctDate);
    
    // Beri hint jika salah
    if (value && value !== correctDate) {
      setHint("❣️ Ingat tanggal spesial kita pertama kali...");
      setTimeout(() => setHint(""), 3000);
    }
  };

  const handleSubmit = () => {
    if (date === correctDate && name.trim()) {
      // Animasi sebelum pindah scene
      const submitBtn = document.querySelector('.submit-btn');
      if (submitBtn) {
        submitBtn.classList.add('animate-pulse-heart');
        setTimeout(() => {
          submitBtn.classList.remove('animate-pulse-heart');
          next();
        }, 1000);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="h-full flex flex-col items-center justify-center p-6 relative z-10"
    >
      <div className="absolute top-10 animate-float">
        <Heart className="w-16 h-16 text-pink-400 fill-pink-400" />
      </div>
      <div className="absolute bottom-20 right-10 animate-spin-slow">
        <Crown className="w-10 h-10 text-yellow-400 fill-yellow-400" />
      </div>
      <div className="absolute top-1/3 left-1/4 animate-bounce">
        <Flower2 className="w-8 h-8 text-rose-400" />
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mb-4">
          🎀 Gerbang Cinta Kita 🎀
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Masukkan kode rahasia untuk masuk ke dunia kita berdua</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="w-full max-w-md space-y-6 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-2 border-pink-300/50 relative"
      >
        {/* Decorative elements */}
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
          <Key className="w-4 h-4 text-white" />
        </div>
        <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
          <Lock className="w-4 h-4 text-white" />
        </div>

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
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="submit-btn w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white p-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Sparkles className="w-6 h-6" />
              Buka Dunia Cinta Kita ✨
              <Sparkles className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-500 text-sm mt-4 text-center pt-4 border-t border-pink-100"
        >
          🔐 Hanya untuk {name || "kamu"} yang paling spesial di hati Mas Bagus
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// SCENE 1: Cinematic Opening dengan Efek Lebih Dramatis
function Scene1({ name, next }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showInstruction, setShowInstruction] = useState(false);
  
  const texts = [
    `Untuk ${name || "sayangku"}...`,
    `Yang membuat setiap detik terasa seperti dongeng indah...`,
    `Dan setiap momen bersamamu adalah cerita terbaik dalam hidupku...`,
    `Kamu adalah alasan mengapa pagi selalu lebih cerah...`,
    `Dan alasan mengapa malam selalu penuh harapan...`
  ];

  useEffect(() => {
    setCurrentTextIndex(0);
    setShowInstruction(false);
    
    const timers = [];
    
    const showText = (index) => {
      if (index < texts.length) {
        const timer = setTimeout(() => {
          setCurrentTextIndex(index);
          if (index === texts.length - 1) {
            const instructionTimer = setTimeout(() => {
              setShowInstruction(true);
            }, 2000);
            timers.push(instructionTimer);
          } else {
            showText(index + 1);
          }
        }, 3000);
        timers.push(timer);
      }
    };
    
    const startTimer = setTimeout(() => {
      showText(0);
    }, 1000);
    timers.push(startTimer);
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white p-8 relative overflow-hidden cursor-pointer"
      onClick={next}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
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
        
        {/* Large floating hearts */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-rose-200/20"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              fontSize: '120px',
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-12 relative z-10 max-w-3xl">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="relative mx-auto"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/50">
            <Heart className="w-16 h-16 fill-white animate-pulse" />
          </div>
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-xl opacity-30"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ type: "spring", damping: 15 }}
              className="text-3xl md:text-4xl font-light leading-relaxed bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent"
            >
              {texts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="pt-8"
        >
          {showInstruction ? (
            <p className="text-lg opacity-90 flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 animate-spin" />
              <span className="animate-pulse">Sentuh layar untuk melanjutkan ke keajaiban...</span>
              <Sparkles className="w-6 h-6 animate-spin" />
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-pink-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// SCENE 2: Birthday Celebration dengan Efek Wow
function Scene2({ name, next }) {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    setIsShaking(true);
    const timer = setTimeout(() => setIsShaking(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 relative overflow-hidden cursor-pointer"
      onClick={next}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
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
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {["🎉", "🎊", "🎁", "✨", "🌟", "💫", "🌸", "💖"][i % 8]}
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-8 relative z-10 max-w-4xl">
        {/* Animated Cake */}
        <motion.div
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative"
        >
          <div className="relative w-64 h-64 mx-auto">
            {/* Cake Base */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-gradient-to-b from-amber-300 to-amber-600 rounded-t-3xl shadow-lg">
              {/* Cake Layers */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-56 h-16 bg-gradient-to-b from-pink-300 to-rose-500 rounded-full shadow-lg"></div>
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-44 h-12 bg-gradient-to-b from-white to-pink-200 rounded-full shadow-lg"></div>
              
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
            
            {/* Birthday Hat */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity 
              }}
              className="absolute -top-20 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-pink-500"></div>
              <div className="w-2 h-10 bg-gradient-to-b from-yellow-400 to-yellow-600 mx-auto"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Birthday Message */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="space-y-4"
        >
          <motion.h1
            animate={isShaking ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0]
            } : {}}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent"
          >
            SELAMAT ULANG TAHUN!
          </motion.h1>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="inline-block"
          >
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full text-3xl font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
              🎂 {name || "Sayangku"} yang ke-23 🎂
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-2xl text-gray-700 font-semibold"
          >
            Semoga setiap lilin ini menerangi jalan menuju kebahagiaanmu! 💝
          </motion.p>
        </motion.div>

        {/* Interactive Instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="pt-8"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-pink-200">
            <Sparkles className="w-5 h-5 text-yellow-500 animate-spin-slow" />
            <p className="text-gray-600 font-medium">
              Sentuh layar untuk melihat galeri kenangan kita...
            </p>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// SCENE 3: Enhanced Gallery Scene dengan Foto dan Video
function GalleryScene({ name, onNext }) {
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
        },
        { 
          id: 3, 
          type: "video", 
          title: "Video: Ngobrol Santai",
          caption: "Canda tawa pertama kita",
          icon: "🎬",
          details: "Durasi 2:34 - Kamu ketawa sambil nutupin mulut, lucu banget!"
        },
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
        },
        { 
          id: 3, 
          type: "photo", 
          title: "Makan Seafood",
          caption: "Kepiting favorit kita berdua",
          icon: "🦀",
          details: "Kamu pake bibdana, muka serius waktu makan kepiting, gemesin!"
        },
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
        },
        { 
          id: 3, 
          type: "photo", 
          title: "Hadiah Spesial",
          caption: "Kalung dengan liontin hati",
          icon: "💝",
          details: "Kamu bilang ini simbol cinta kita yang akan selalu melekat"
        },
      ]
    }
  };

  const handleAlbumClick = (albumId) => {
    setSelectedAlbum(albumId);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => {
      setSelectedAlbum(null);
    }, 300);
  };

  const selectedCollection = selectedAlbum ? albums[selectedAlbum] : null;

  return (
    <div className="h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full flex flex-col bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50"
      >
        {/* Header */}
        <div className="pt-16 px-6 text-center">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <Camera className="w-8 h-8 text-pink-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📸 Galeri Kenangan Kita
            </h2>
            <Video className="w-8 h-8 text-purple-500" />
          </motion.div>
          <p className="text-gray-600 text-lg">Klik album favorit untuk melihat detail kenangan indah kita</p>
        </div>

        {/* Album Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.values(albums).map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group cursor-pointer"
                  onClick={() => handleAlbumClick(album.id)}
                >
                  <div className={`aspect-square rounded-3xl bg-gradient-to-br ${album.color} shadow-2xl overflow-hidden`}>
                    <div className="w-full h-full flex flex-col items-center justify-center p-8">
                      <span className="text-7xl mb-4">{album.icon}</span>
                      <h3 className="text-2xl font-bold text-white text-center mb-2">{album.title}</h3>
                      <p className="text-white/90 text-center">{album.date}</p>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <div className="bg-white/95 p-4 rounded-xl shadow-lg text-center">
                          <p className="text-pink-600 font-bold">Lihat {album.memories.length} kenangan</p>
                          <p className="text-sm text-gray-600 mt-1">Klik untuk membuka</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-pink-600">
                      {album.memories.length} items
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mt-4 text-center">
                    <p className="text-gray-700 font-medium">{album.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200 max-w-2xl mx-auto"
            >
              <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-3 rounded-xl">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-purple-700 mb-2">
                    Cara Menikmati Galeri
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>Klik album untuk melihat koleksi lengkap</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>Setiap album berisi foto dan video spesial</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>Baca cerita di balik setiap momen</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 text-center">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg cursor-pointer"
            onClick={onNext}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Lanjutkan Ke Timeline Cinta Kita</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </div>
      </motion.div>

      {/* Album Detail Popup */}
      <AnimatePresence>
        {isPopupOpen && selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleClosePopup}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-b from-white to-pink-50 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Popup Header */}
              <div className={`p-6 bg-gradient-to-r ${selectedCollection.color} text-white`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-3xl font-bold">{selectedCollection.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="opacity-90">{selectedCollection.date}</p>
                      <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                        <span className="text-sm">{selectedCollection.memories.length} kenangan</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClosePopup}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <p className="mt-4 opacity-90">{selectedCollection.description}</p>
              </div>

              {/* Popup Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div className="space-y-6">
                  {selectedCollection.memories.map((memory, index) => (
                    <motion.div
                      key={memory.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${memory.type === 'video' ? 'bg-blue-100' : 'bg-pink-100'}`}>
                          <span className="text-3xl">{memory.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-gray-800">{memory.title}</h4>
                            {memory.type === 'video' && (
                              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                VIDEO
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{memory.caption}</p>
                          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4">
                            <p className="text-gray-700 text-sm flex items-center gap-2">
                              <MessageCircle className="w-4 h-4 text-pink-500" />
                              <span className="italic">{memory.details}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Personal Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-6 h-6 text-pink-600 fill-pink-600" />
                    <h5 className="text-xl font-bold text-pink-700">Pesan dari Mas Bagus</h5>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    "Setiap kenangan dalam album ini adalah harta karun yang tak ternilai harganya. 
                    Dari momen pertama kita bertemu hingga hari ini, setiap detik bersamamu adalah anugerah. 
                    Terima kasih {name || "sayang"} telah mengisi hidupku dengan cerita-cerita indah ini."
                  </p>
                  <p className="text-right text-pink-600 font-bold mt-4 text-lg">
                    - Mas Bagus 💕
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SCENE 4: Timeline Cinta
function TimelineScene({ name, onNext }) {
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
        },
        {
          date: "Juli 2023",
          title: "Liburan Pertama",
          description: "Petualangan ke pantai bersama",
          icon: "🏖️"
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
        },
        {
          date: "Oktober 2024",
          title: "Achievement Spesial",
          description: "Kamu lulus dengan nilai terbaik",
          icon: "🎓"
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-pink-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-3"
          >
            <Clock className="w-8 h-8 text-purple-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Timeline Cinta Kita
            </h2>
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
          </motion.div>
          <p className="text-gray-600 text-lg">Perjalanan indah kita dari awal hingga sekarang</p>
        </div>

        {/* Year Navigation */}
        <div className="flex justify-center gap-4">
          {timelineEvents.map(({ year }) => (
            <motion.button
              key={year}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentYear(year)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${currentYear === year ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' : 'bg-white/80 text-gray-600 border border-pink-200'}`}
            >
              {year}
            </motion.button>
          ))}
        </div>

        {/* Timeline Content */}
        <motion.div
          key={currentYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-2 rounded-full text-xl font-bold">
                Tahun {currentYear}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentTimeline?.events.map((event, index) => (
              <motion.div
                key={`${currentYear}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    <span className="text-3xl">{event.icon}</span>
                  </div>
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
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200 mt-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-pink-700">Refleksi Cinta</h4>
              <p className="text-gray-600">Dari Mas Bagus untuk {name || "kekasihku"}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            "Lihatlah bagaimana perjalanan kita tumbuh dari waktu ke waktu. 
            Setiap tahun bersama kamu adalah tahun yang penuh makna, tawa, dan cinta. 
            Aku bersyukur bisa menjadi bagian dari setiap bab dalam cerita hidupmu, {name || "sayang"}."
          </p>
        </motion.div>

        {/* Next Button */}
        <div className="text-center pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            Lanjutkan Ke Surat Cinta
            <Sparkles className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// SCENE 5: Love Letter Scene yang Lebih Personal
function LoveLetterScene({ name, onNext }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
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
    setVisibleMessages([]);
    setIsComplete(false);
    setShowEnvelope(true);
    
    const timers = [];
    let currentIndex = 0;
    
    // Buka envelope setelah 1 detik
    const envelopeTimer = setTimeout(() => {
      setShowEnvelope(false);
      
      // Mulai menampilkan pesan setelah envelope terbuka
      const startTimer = setTimeout(() => {
        const showMessage = (index) => {
          if (index < messages.length) {
            const timer = setTimeout(() => {
              setVisibleMessages(prev => [...prev, messages[index]]);
              if (index === messages.length - 1) {
                const completeTimer = setTimeout(() => {
                  setIsComplete(true);
                }, 2000);
                timers.push(completeTimer);
              } else {
                showMessage(index + 1);
              }
            }, 1800);
            timers.push(timer);
          }
        };
        
        showMessage(0);
      }, 1000);
      timers.push(startTimer);
    }, 1000);
    timers.push(envelopeTimer);
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-100 to-pink-100 relative overflow-hidden"
      onClick={isComplete ? onNext : undefined}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            💌
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Envelope Animation */}
        <AnimatePresence>
          {showEnvelope && (
            <motion.div
              key="envelope"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl"
                >
                  💌
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-gray-600 mt-4 text-lg"
                >
                  Membuka surat cinta dari Mas Bagus...
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letter Content */}
        <AnimatePresence>
          {!showEnvelope && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-pink-300 relative"
            >
              {/* Letter Decoration */}
              <div className="absolute top-4 left-4 text-pink-300">
                ❤️ ❤️ ❤️
              </div>
              <div className="absolute top-4 right-4 text-pink-300">
                ❤️ ❤️ ❤️
              </div>
              
              {/* Letter Header */}
              <div className="text-center mb-8 pb-8 border-b border-pink-200">
                <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-4">
                  <Heart className="w-10 h-10 text-white fill-white" />
                </div>
                <h3 className="text-3xl font-bold text-pink-700">Surat Cinta Untukmu</h3>
                <p className="text-gray-600 mt-2">Ditulis dengan cinta tak terhingga oleh Mas Bagus</p>
              </div>

              {/* Letter Body */}
              <div className="space-y-6 min-h-[400px]">
                {visibleMessages.map((message, index) => (
                  <motion.div
                    key={`message-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 pt-1">
                      <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed flex-1">
                      {message}
                    </p>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {visibleMessages.length < messages.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center h-8"
                  >
                    <div className="flex items-center gap-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 bg-pink-400 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Signature */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 pt-8 border-t border-pink-200"
                >
                  <div className="text-right">
                    <p className="text-pink-600 font-bold text-2xl mb-2">
                      Dengan cinta yang abadi,
                    </p>
                    <div className="inline-block">
                      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-2 rounded-lg">
                        <p className="text-xl font-bold">Mas Bagus</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                      <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                      <Heart className="w-8 h-8 text-purple-500 fill-purple-500" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Instruction */}
              <div className="mt-8 text-center pt-6 border-t border-pink-100">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-3 bg-pink-50 px-6 py-3 rounded-full"
                >
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  <p className="text-gray-600 font-medium">
                    {isComplete ? "Sentuh layar untuk kejutan terakhir..." : "Membaca pesan cinta..."}
                  </p>
                  <Sparkles className="w-5 h-5 text-pink-500" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// SCENE 6: Final Scene dengan Banyak Kejutan
function FinalScene({ name, onPlayAudio, musicPlaying }) {
  const [visibleWishes, setVisibleWishes] = useState([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  
  const wishes = [
    "Semoga tahun ini membawa kebahagiaan yang lebih besar dari sebelumnya,",
    "kesuksesan di setiap usaha yang kamu jalani,",
    "dan kesehatan yang selalu menyertai langkahmu.",
    "Semoga semua impian dan cita-citamu perlahan tapi pasti menjadi kenyataan.",
    "Semoga kamu selalu dikelilingi oleh orang-orang yang mencintaimu tulus,",
    "dan semoga kamu selalu punya alasan untuk tersenyum setiap hari.",
    "Semoga petualanganmu tahun ini penuh dengan cerita seru dan pengalaman berharga.",
    "Semoga kamu menemukan hal-hal baru yang membuat hatimu berdebar,",
    "dan semoga kamu terus tumbuh menjadi versi terbaik dari dirimu sendiri.",
    "Dan yang terpenting, semoga kamu tahu betapa berharganya kamu bagi dunia...",
    "dan betapa spesialnya kamu bagiku."
  ];

  useEffect(() => {
    setVisibleWishes([]);
    setShowFinalMessage(false);
    setShowGift(false);
    setGiftOpened(false);
    
    const timers = [];
    let currentIndex = 0;
    
    const showWish = (index) => {
      if (index < wishes.length) {
        const timer = setTimeout(() => {
          setVisibleWishes(prev => [...prev, wishes[index]]);
          if (index === wishes.length - 1) {
            const finalTimer = setTimeout(() => {
              setShowFinalMessage(true);
              const giftTimer = setTimeout(() => {
                setShowGift(true);
              }, 2000);
              timers.push(giftTimer);
            }, 2000);
            timers.push(finalTimer);
          } else {
            showWish(index + 1);
          }
        }, 1500);
        timers.push(timer);
      }
    };
    
    const startTimer = setTimeout(() => {
      showWish(0);
    }, 1000);
    timers.push(startTimer);
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleOpenGift = () => {
    setGiftOpened(true);
    // Simulate gift opening animation
    setTimeout(() => {
      alert(`🎁 Hadiah Virtual untuk ${name || "Sayangku"}:\n\n1. Voucher Spa Day\n2. Romantic Dinner for Two\n3. Weekend Getaway\n4. Personalized Love Book\n5. Surprise Trip!\n\n*Hadiah nyata akan diberikan saat kita bertemu! 💕`);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-100 via-pink-100 to-rose-100 relative overflow-y-auto"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
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
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {["💖", "✨", "🎀", "🎉", "🌸", "🌟", "💫", "🎁"][i % 8]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        {/* Main Celebration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.6 }}
          className="relative mx-auto w-72 h-72"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-full blur-2xl opacity-50"></div>
          <div className="relative w-full h-full bg-white rounded-full p-4 shadow-2xl">
            <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex flex-col items-center justify-center p-8">
              <span className="text-8xl mb-4">🎂</span>
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-700">Happy Birthday!</p>
                <p className="text-lg text-gray-600">To My Special Someone</p>
              </div>
            </div>
          </div>
          
          {/* Rotating Stars */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${25 + 50 * Math.cos((i * Math.PI) / 2)}%`,
                left: `${25 + 50 * Math.sin((i * Math.PI) / 2)}%`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Birthday Greeting */}
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent"
          >
            Selamat Ulang Tahun ke-23!
          </motion.h2>
          <p className="text-2xl text-gray-700">
            Untuk <span className="font-bold text-pink-600">{name || "Sayangku"}</span> yang tercinta 💝
          </p>
        </div>

        {/* Wishes Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-200">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center text-purple-700 mb-6">
              Doa dan Harapan untukmu di Tahun Ini
            </h3>
            
            {visibleWishes.map((wish, index) => (
              <motion.div
                key={`wish-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
                <p className="text-lg text-gray-700 flex-1">
                  {wish}
                </p>
              </motion.div>
            ))}
            
            {/* Loading Indicator */}
            {visibleWishes.length < wishes.length && (
              <div className="flex justify-center py-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-3 h-3 bg-pink-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-3 h-3 bg-pink-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-3 h-3 bg-pink-400 rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Final Love Message */}
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 border-2 border-pink-300 shadow-lg"
          >
            <div className="space-y-4">
              <p className="text-3xl font-bold text-pink-600 mb-2">
                I love you lebih dari apapun, {name || "Dede Cantik"}! 💕
              </p>
              <p className="text-xl text-gray-700">
                Kamu adalah berkah terbesar dalam hidupku, alasan aku tersenyum setiap hari, 
                dan alasan aku bersyukur setiap malam.
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
                <Heart className="w-10 h-10 text-rose-500 fill-rose-500 animate-pulse" />
                <Heart className="w-8 h-8 text-purple-500 fill-purple-500 animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Interactive Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
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
            <p className="text-sm opacity-90">
              {musicPlaying ? '🎵 Dengarkan lagu cinta kita...' : '🎶 Klik untuk memutar'}
            </p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenGift}
            disabled={!showGift}
            className={`p-6 rounded-2xl font-bold shadow-lg transition-all flex flex-col items-center justify-center gap-3 ${showGift ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8" />
              <span className="text-xl">
                {giftOpened ? 'Hadiah Terbuka!' : 'Buka Hadiah Rahasia'}
              </span>
            </div>
            <p className="text-sm opacity-90">
              {showGift ? '🎁 Klik untuk melihat kejutan!' : 'Tunggu sebentar...'}
            </p>
          </motion.button>
        </div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center pt-8 border-t border-pink-200"
        >
          <p className="text-gray-600 text-lg">
            Website ini dibuat dengan sepenuh hati oleh Mas Bagus,
          </p>
          <p className="text-gray-500 mt-2">
            sebagai bukti cinta yang akan abadi dalam memori digital kita.
          </p>
          <div className="mt-6 text-sm text-gray-400 space-y-1">
            <p>Dibuat khusus untuk {name || "kamu"} di hari ulang tahunmu yang ke-23</p>
            <p>
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </motion.div>

        {/* Floating Hearts */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              <Heart className={`w-6 h-6 ${i % 3 === 0 ? 'text-pink-500' : i % 3 === 1 ? 'text-rose-500' : 'text-purple-500'} fill-current`} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Confetti Component yang Lebih Meriah
function Confetti() {
  const confettiColors = [
    '#f472b6', '#ec4899', '#db2777', '#c026d3', '#a855f7',
    '#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4'
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(200)].map((_, i) => {
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const size = Math.random() * 12 + 4;
        const shape = Math.random() > 0.5 ? 'circle' : 'rectangle';
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: shape === 'circle' ? `${size}px` : `${size / 2}px`,
              backgroundColor: color,
              borderRadius: shape === 'circle' ? '50%' : '2px',
            }}
            initial={{
              y: -50,
              x: Math.random() * 100 - 50,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: ['0vh', '100vh'],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, 720],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              ease: "linear",
              times: [0, 0.2, 0.8, 1],
            }}
          />
        );
      })}
      
      {/* Large Floating Elements */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute text-3xl"
          style={{
            left: `${Math.random() * 100}%`,
          }}
          initial={{
            y: -100,
            x: Math.random() * 100 - 50,
            rotate: 0,
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            ease: "linear",
            delay: i * 0.3,
          }}
        >
          {["💖", "✨", "🎉", "🎊", "🌟", "💫", "🎁", "🌸", "🎀", "🥳"][i]}
        </motion.div>
      ))}
    </div>
  );
}
