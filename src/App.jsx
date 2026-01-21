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
  const correctDate = "22-01-2007"; // Tanggal lahir pacarmu: 22 Januari 2007

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
    // Inisialisasi audio dengan lagu ulang tahun yang lebih universal
    audioRef.current = new Audio("https://assets.mixkit.co/music/preview/mixkit-birthday-party-dance-1816.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
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
      @keyframes bounce-subtle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
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
      .animate-bounce-subtle {
        animation: bounce-subtle 2s ease-in-out infinite;
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
          <SecretEntrance 
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
        return <CinematicOpening key="scene1" name={name} next={next} />;
      case 2:
        return <BirthdayReveal key="scene2" name={name} next={next} />;
      case 3:
        return <GiftGallery key="scene3" name={name} onNext={next} />;
      case 4:
        return <SpecialMessage key="scene4" name={name} onNext={next} />;
      case 5:
        return <WishesForYou key="scene5" name={name} onNext={next} />;
      case 6:
        return <FinalSurprise key="scene6" name={name} onPlayAudio={toggleMusic} musicPlaying={musicPlaying} />;
      default:
        return <SecretEntrance 
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
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 overflow-hidden relative font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 left-10 w-24 h-24 bg-purple-300 rounded-full opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300 rounded-full opacity-15"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        ></motion.div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-15"></div>
        
        {/* Floating stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300"
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
            ✨
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
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm ${musicPlaying ? 'bg-purple-500 text-white' : 'bg-white/80 text-purple-600'}`}
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
            className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-200 text-purple-600 flex items-center gap-2 text-sm font-medium"
          >
            ← Kembali
          </motion.button>
        </div>
      )}

      {/* Scene Indicator */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-200">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${scene === index ? 'bg-purple-500 scale-125' : 'bg-purple-200'}`}
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

// SCENE 0: Secret Entrance - Tampilan Netral Sebelum Login
function SecretEntrance({ name, setName, date, setDate, correctDate, next }) {
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [hint, setHint] = useState("");

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    setIsIncorrect(value && value !== correctDate);
    
    // Beri hint jika salah
    if (value && value !== correctDate) {
      setHint("🎈 Ingat tanggal spesial yang selalu kuingat...");
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
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
          <span className="text-2xl">🎁</span>
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-spin-slow">
        <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
      </div>
      <div className="absolute top-1/3 left-1/4 animate-bounce-subtle">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
          <span className="text-lg">🎀</span>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          🔐 Pintu Rahasia 🔐
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Masukkan kode akses untuk membuka sesuatu yang spesial</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="w-full max-w-md space-y-6 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-2 border-purple-300/50 relative"
      >
        {/* Decorative elements - netral */}
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Key className="w-4 h-4 text-white" />
        </div>
        <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
          <Lock className="w-4 h-4 text-white" />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-3 flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              🎯 Nama Panggilanmu
            </label>
            <input
              type="text"
              placeholder="Masukkan nama panggilanmu..."
              className="w-full p-4 rounded-2xl border-2 border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all bg-white/70 placeholder:text-purple-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              📆 Tanggal Spesial (DD-MM-YYYY)
            </label>
            <input
              type="text"
              placeholder="Masukkan tanggal rahasia..."
              className="w-full p-4 rounded-2xl border-2 border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all bg-white/70 placeholder:text-purple-300"
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
              className="submit-btn w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Sparkles className="w-6 h-6" />
              Buka Kejutan Spesial ✨
              <Sparkles className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-500 text-sm mt-4 text-center pt-4 border-t border-purple-100"
        >
          🎈 Hanya untuk seseorang yang spesial
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// SCENE 1: Cinematic Opening - Tema Ulang Tahun Terungkap!
function CinematicOpening({ name, next }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showInstruction, setShowInstruction] = useState(false);
  
  const texts = [
    `Untuk ${name || "kamu"} yang paling spesial...`,
    `Di hari yang penuh makna ini...`,
    `Sebuah kejutan telah dipersiapkan...`,
    `Untuk merayakan hari yang sangat penting...`,
    `Siap untuk kejutan ulang tahun?`
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
        }, 2500);
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
      className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white p-8 relative overflow-hidden cursor-pointer"
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
        
        {/* Large floating party elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`party-${i}`}
            className="absolute text-white/20"
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
            {["🎉", "🎂", "🎁"][i]}
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
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
            <div className="text-6xl animate-bounce">🎂</div>
          </div>
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full blur-xl opacity-30"
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
              className="text-3xl md:text-4xl font-light leading-relaxed bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent"
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
              <span className="animate-pulse">Sentuh layar untuk melihat kejutan!</span>
              <Sparkles className="w-6 h-6 animate-spin" />
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full"
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

// SCENE 2: Birthday Reveal - Pengumuman Ulang Tahun!
function BirthdayReveal({ name, next }) {
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
            {["🎉", "🎊", "🎁", "✨", "🌟", "💫", "🥳", "🎈"][i % 8]}
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-8 relative z-10 max-w-4xl">
        {/* Animated Cake with Age */}
        <motion.div
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative"
        >
          <div className="relative w-64 h-64 mx-auto">
            {/* Cake Base */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-gradient-to-b from-yellow-300 to-amber-600 rounded-t-3xl shadow-lg">
              {/* Cake Layers */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-56 h-16 bg-gradient-to-b from-pink-300 to-purple-500 rounded-full shadow-lg"></div>
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-44 h-12 bg-gradient-to-b from-white to-pink-200 rounded-full shadow-lg"></div>
              
              {/* Candles - 19 lilin untuk usia 19 tahun (2007 lahir) */}
              {[...Array(19)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-full"
                  style={{
                    left: `${(i * 22) % 200}%`,
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
            
            {/* Age Display */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity 
              }}
              className="absolute -top-32 left-1/2 transform -translate-x-1/2"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg">
                🎂 19 TAHUN 🎂
              </div>
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
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            SELAMAT ULANG TAHUN!
          </motion.h1>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="inline-block"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full text-3xl font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
              🎉 {name || "Sayangku"} yang ke-19 🎉
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-2xl text-gray-700 font-semibold"
          >
            Selamat datang di dunia yang lebih dewasa! 🎊
          </motion.p>
        </motion.div>

        {/* Interactive Instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="pt-8"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-purple-200">
            <Sparkles className="w-5 h-5 text-yellow-500 animate-spin-slow" />
            <p className="text-gray-600 font-medium">
              Sentuh layar untuk melihat galeri hadiah digital!
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

// SCENE 3: Memory Gallery - Galeri Kenangan Spesial
function MemoryGallery({ name, onNext }) {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const memories = [
    {
      id: "memory1",
      title: "Awal Kisah Kita",
      date: "Momen Pertama",
      description: "Saat pertama kali kenal, tersenyum, dan memulai cerita",
      icon: "💖",
      color: "from-pink-400 to-rose-500",
      photo: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?auto=format&fit=crop&w=600",
      contents: [
        {
          id: 1,
          type: "moment",
          title: "Pertemuan Pertama",
          caption: "Hari itu sangat spesial",
          icon: "✨",
          details: "Saat mata kita pertama kali bertemu, sesuatu yang indah dimulai"
        },
        {
          id: 2,
          type: "feeling",
          title: "Perasaan Awal",
          caption: "Hati berdebar-debar",
          icon: "💗",
          details: "Setiap detik bersamamu terasa begitu berarti sejak awal"
        }
      ]
    },
    {
      id: "memory2",
      title: "Tawa & Kebahagiaan",
      date: "Momen Bahagia",
      description: "Saat-saat tertawa dan bahagia bersama",
      icon: "😂",
      color: "from-yellow-400 to-orange-500",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600",
      contents: [
        {
          id: 1,
          type: "laughter",
          title: "Tawa yang Menular",
          caption: "Tawamu membuat hariku cerah",
          icon: "😄",
          details: "Tawamu adalah musik terindah yang pernah kudengar"
        },
        {
          id: 2,
          type: "joy",
          title: "Kebahagiaan Sederhana",
          caption: "Bersamamu adalah kebahagiaan",
          icon: "🥰",
          details: "Hal sederhana bersamamu terasa begitu istimewa"
        }
      ]
    },
    {
      id: "memory3",
      title: "Dukungan & Pengertian",
      date: "Momen Support",
      description: "Saat kita saling mendukung dan mengerti",
      icon: "🤝",
      color: "from-blue-400 to-cyan-500",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600",
      contents: [
        {
          id: 1,
          type: "support",
          title: "Saling Mendukung",
          caption: "Selalu ada satu untuk yang lain",
          icon: "💪",
          details: "Di saat sulit maupun senang, kita selalu bersama"
        },
        {
          id: 2,
          type: "understanding",
          title: "Saling Mengerti",
          caption: "Tanpa perlu banyak kata",
          icon: "🧠",
          details: "Kita saling mengerti meski tak selalu mengatakan"
        }
      ]
    }
  ];

  const handleMemoryClick = (memoryId) => {
    setSelectedMemory(memoryId);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => {
      setSelectedMemory(null);
    }, 300);
  };

  const selectedMemoryItem = selectedMemory ? memories.find(m => m.id === selectedMemory) : null;

  // Instructions untuk upload foto
  const PhotoUploadGuide = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg border border-pink-200 max-w-2xl mx-auto"
    >
      <div className="flex items-start gap-4">
        <div className="bg-pink-100 p-3 rounded-xl">
          <Camera className="w-6 h-6 text-pink-600" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-pink-700 mb-2">
            Ingin Menambahkan Foto Kenanganmu?
          </h4>
          <p className="text-gray-700 mb-3">
            Website ini bisa ditambahkan foto-foto kenangan spesial kalian berdua!
          </p>
          <div className="bg-white/80 p-4 rounded-lg border border-pink-100">
            <p className="text-sm text-gray-600 font-medium mb-2">Caranya:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Ganti URL foto di kode dengan URL foto kenanganmu</li>
              <li>Atau upload ke layanan seperti Imgur/Google Drive</li>
              <li>Copy link foto dan paste di bagian "photo"</li>
            </ol>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full flex flex-col bg-gradient-to-b from-pink-50 via-rose-50 to-purple-50"
      >
        {/* Header */}
        <div className="pt-16 px-6 text-center">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <Flower2 className="w-8 h-8 text-pink-500" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              📸 Galeri Kenangan Spesial
            </h2>
            <Flower2 className="w-8 h-8 text-purple-500" />
          </motion.div>
          <p className="text-gray-600 text-lg">Koleksi momen indah untuk mengisi hari spesialmu</p>
        </div>

        {/* Memory Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {memories.map((memory, index) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group cursor-pointer"
                  onClick={() => handleMemoryClick(memory.id)}
                >
                  <div className={`aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative`}>
                    {/* Background Photo dengan overlay gradient */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${memory.photo})` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent`} />
                    </div>
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-6">
                      <div className="mb-4">
                        <span className="text-4xl mb-2 inline-block">{memory.icon}</span>
                        <h3 className="text-2xl font-bold text-white mb-1">{memory.title}</h3>
                        <p className="text-white/90 text-sm">{memory.date}</p>
                      </div>
                      <p className="text-white/80 text-sm">{memory.description}</p>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/0 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <div className="bg-white/95 p-4 rounded-xl shadow-lg text-center">
                          <p className="text-pink-600 font-bold">Buka Kenangan</p>
                          <p className="text-sm text-gray-600 mt-1">Klik untuk melihat detail</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-pink-600">
                      {memory.contents.length} kenangan
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ganti "Cara Menikmati Hadiah" dengan pesan yang lebih sesuai */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200 max-w-2xl mx-auto"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-pink-700 mb-2">
                    Setiap Kenangan adalah Hadiah
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    "Momen-momen indah yang kita bagi adalah harta yang tak ternilai. 
                    Di ulang tahunmu yang ke-19 ini, mari kita mengenang kembali kebahagiaan 
                    yang telah kita buat bersama. Semoga di usia yang baru ini, kita bisa 
                    membuat lebih banyak kenangan manis lagi."
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Sparkles className="w-4 h-4" />
                    <span>Scroll ke bawah untuk melanjutkan ke pesan spesial</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Panduan upload foto */}
            <PhotoUploadGuide />
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
            <span className="font-medium">Lanjutkan Ke Pesan Spesial</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </div>
      </motion.div>

      {/* Memory Detail Popup */}
      <AnimatePresence>
        {isPopupOpen && selectedMemoryItem && (
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
              {/* Popup Header dengan Photo Background */}
              <div
                className="h-64 relative bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedMemoryItem.photo})` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${selectedMemoryItem.color}/90 to-black/70`}>
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-3xl font-bold text-white">{selectedMemoryItem.title}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-white/90">{selectedMemoryItem.date}</p>
                          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                            <span className="text-sm text-white">Kenangan spesial</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClosePopup}
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                      >
                        <X className="w-6 h-6 text-white" />
                      </motion.button>
                    </div>
                    <p className="text-white/90 text-lg mt-4">{selectedMemoryItem.description}</p>
                  </div>
                </div>
              </div>

              {/* Popup Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></div>
                    Detail Kenangan
                  </h4>
                  
                  {selectedMemoryItem.contents.map((content, index) => (
                    <motion.div
                      key={content.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                          content.type === 'moment' ? 'bg-pink-100' :
                          content.type === 'feeling' ? 'bg-rose-100' :
                          content.type === 'laughter' ? 'bg-yellow-100' :
                          content.type === 'joy' ? 'bg-orange-100' :
                          content.type === 'support' ? 'bg-blue-100' :
                          'bg-indigo-100'
                        }`}>
                          <span className="text-3xl">{content.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-gray-800">{content.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              content.type === 'moment' ? 'bg-pink-500 text-white' :
                              content.type === 'feeling' ? 'bg-rose-500 text-white' :
                              content.type === 'laughter' ? 'bg-yellow-500 text-white' :
                              content.type === 'joy' ? 'bg-orange-500 text-white' :
                              content.type === 'support' ? 'bg-blue-500 text-white' :
                              'bg-indigo-500 text-white'
                            }`}>
                              {content.type.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3 italic">"{content.caption}"</p>
                          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
                            <p className="text-gray-700 flex items-start gap-2">
                              <MessageCircle className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
                              <span className="italic">{content.details}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Birthday Message di Galeri Kenangan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <h5 className="text-xl font-bold text-rose-700">Untuk Kenangan yang Akan Datang</h5>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    "Di ulang tahunmu yang ke-19 ini, aku berjanji akan terus mengumpulkan momen-momen indah bersamamu. 
                    Setiap foto, setiap kenangan, setiap detik yang kita lewati bersama adalah hadiah terindah. 
                    Aku tak sabar untuk membuat lebih banyak kenangan manis di usiamu yang baru ini."
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-rose-600 font-bold">
                      - Untuk lebih banyak senyuman dan tawa -
                    </p>
                    <div className="text-2xl">💝</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SCENE 4: Special Message - Pesan Spesial Ulang Tahun
function SpecialMessage({ name, onNext }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const messages = [
    `Di hari ulang tahunmu yang ke-19, ${name || "sayangku"}...`,
    "Aku ingin mengungkapkan betapa bangganya aku mengenalmu.",
    "Di usiamu yang baru ini, kamu telah tumbuh menjadi seseorang yang luar biasa.",
    "Setiap pencapaianmu, setiap senyumanmu, membuat dunia lebih indah.",
    "Di usia 19, banyak hal baru menantimu.",
    "Petualangan, pengalaman, dan pelajaran hidup yang berharga.",
    "Tapi ingatlah, apapun yang terjadi...",
    "Kamu tidak pernah sendirian.",
    "Selalu ada yang mendukungmu dari jauh.",
    "Percayalah pada dirimu sendiri.",
    "Kamu kuat, kamu mampu, dan kamu spesial.",
    "Selamat ulang tahun untuk pribadi yang luar biasa.",
    "Semoga semua impianmu menjadi kenyataan di usia 19 ini."
  ];

  useEffect(() => {
    setVisibleMessages([]);
    setIsComplete(false);
    
    const timers = [];
    let currentIndex = 0;
    
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
    
    const startTimer = setTimeout(() => {
      showMessage(0);
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
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-purple-100 relative overflow-hidden"
      onClick={isComplete ? onNext : undefined}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-200"
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
            ✉️
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-blue-300 relative"
        >
          {/* Letter Decoration */}
          <div className="absolute top-4 left-4 text-blue-300">
            🎂 🎂 🎂
          </div>
          <div className="absolute top-4 right-4 text-blue-300">
            🎂 🎂 🎂
          </div>
          
          {/* Letter Header */}
          <div className="text-center mb-8 pb-8 border-b border-blue-200">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
              <div className="text-2xl">19</div>
            </div>
            <h3 className="text-3xl font-bold text-blue-700">Pesan Spesial Ulang Tahun</h3>
            <p className="text-gray-600 mt-2">Untukmu di usia yang penuh makna</p>
          </div>

          {/* Message Body */}
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
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
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
                      className="w-2 h-2 bg-blue-400 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Completion */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 pt-8 border-t border-blue-200"
            >
              <div className="text-center">
                <p className="text-blue-600 font-bold text-2xl mb-2">
                  Selamat Ulang Tahun ke-19!
                </p>
                <div className="inline-block">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-2 rounded-lg">
                    <p className="text-xl font-bold">Semoga Bahagia Selalu</p>
                  </div>
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <div className="text-2xl">🎈</div>
                  <div className="text-2xl">🎉</div>
                  <div className="text-2xl">🎁</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Instruction */}
          <div className="mt-8 text-center pt-6 border-t border-blue-100">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full"
            >
              <Sparkles className="w-5 h-5 text-blue-500" />
              <p className="text-gray-600 font-medium">
                {isComplete ? "Sentuh layar untuk doa-doa terakhir..." : "Membaca pesan spesial..."}
              </p>
              <Sparkles className="w-5 h-5 text-blue-500" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// SCENE 5: Wishes For You - Doa dan Harapan
function WishesForYou({ name, onNext }) {
  const [visibleWishes, setVisibleWishes] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const wishes = [
    "Semoga di usia 19 tahun ini, kamu menemukan jati dirimu",
    "Semoga kesehatan selalu menyertai setiap langkahmu",
    "Semoga kesuksesan menghampiri dalam setiap usahamu",
    "Semoga kebahagiaan menjadi teman setiamu",
    "Semoga impian-impianmu perlahan menjadi kenyataan",
    "Semoga kamu selalu dikelilingi orang-orang baik",
    "Semoga setiap hari membawa cerita baru yang indah",
    "Semoga hatimu selalu dipenuhi kedamaian",
    "Semoga petualangan hidupmu penuh makna",
    "Semoga cinta dan kasih sayang selalu menyertaimu",
    "Dan yang terpenting, semoga kamu selalu menjadi versi terbaik dari dirimu sendiri"
  ];

  useEffect(() => {
    setVisibleWishes([]);
    setShowButton(false);
    
    const timers = [];
    wishes.forEach((wish, index) => {
      const timer = setTimeout(() => {
        setVisibleWishes(prev => [...prev, wish]);
        
        if (index === wishes.length - 1) {
          const buttonTimer = setTimeout(() => {
            setShowButton(true);
          }, 2000);
          timers.push(buttonTimer);
        }
      }, index * 1500);
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-100 to-pink-50 relative"
    >
      {/* Dreamy Background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 2 === 0 ? 'text-blue-300/20' : 'text-purple-200/50'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {["✨", "💫", "🌟", "⭐", "🔮"][i % 5]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-3"
          >
            <Crown className="w-8 h-8 text-yellow-500" />
            <h2 className={`text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
              Doa-Doa untuk Usia 19
            </h2>
            <Crown className="w-8 h-8 text-yellow-500" />
          </motion.div>
          <p className={`text-lg text-gray-600`}>
            Harapan tulus untuk tahun baru dalam hidupmu
          </p>
        </div>

        {/* Wishes Container */}
        <div className="space-y-4 max-h-96 overflow-y-auto p-4">
          {visibleWishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl backdrop-blur-sm bg-white/80 shadow-lg`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100`}>
                  <Star className={`w-4 h-4 text-purple-500`} />
                </div>
                <p className={`flex-1 text-gray-700`}>
                  {wish}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Loading Animation */}
          {visibleWishes.length < wishes.length && (
            <div className="flex justify-center py-4">
              <div className="flex items-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className={`w-2 h-2 rounded-full bg-purple-400`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className={`px-8 py-4 rounded-full text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg flex items-center gap-3`}
            >
              <Sparkles className="w-5 h-5" />
              Lanjutkan Ke Kejutan Terakhir
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// SCENE 6: Final Surprise - Penutupan
function FinalSurprise({ name, onPlayAudio, musicPlaying }) {
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showAge, setShowAge] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFinalMessage(true), 1000);
    const timer2 = setTimeout(() => setShowAge(true), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 relative overflow-y-auto"
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
            {["🎉", "✨", "🎈", "🥳", "🎂", "🌟", "💫", "🎁"][i % 8]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        {/* Age Display */}
        {showAge && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className={`w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center`}>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl"
                >
                  🎂
                </motion.div>
              </div>
              <motion.div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-xl font-bold">
                  USIA 19 TAHUN
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Final Message */}
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center"
          >
            <div className="space-y-4">
              <h2 className={`text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                Happy 19th Birthday!
              </h2>
              <div className={`space-y-4 text-lg text-gray-700`}>
                <p>
                  Terima kasih telah menjadi bagian dari dunia ini...
                </p>
                <p>
                  Terima kasih atas setiap tawa, setiap cerita, setiap momen berharga...
                </p>
                <p className={`text-2xl font-bold text-purple-600`}>
                  Selamat merayakan hari spesialmu!
                </p>
                <p className={`text-xl text-blue-600`}>
                  Semoga tahun ini menjadi tahun terbaik dalam hidupmu
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Selamat Ulang Tahun! 🎉
                </p>
              </div>
            </div>

            {/* Personal Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className={`pt-8 border-t border-purple-200`}
            >
              <p className={`text-sm text-gray-500`}>
                Kejutan digital ini dibuat dengan sepenuh hati
              </p>
              <p className={`text-lg font-bold mt-2 text-gray-800`}>
                - Untuk {name || "kamu"} di ulang tahun ke-19 -
              </p>
              <p className={`text-sm mt-4 text-gray-400`}>
                22 Januari 2007 ~ 22 Januari 2024
              </p>
            </motion.div>

            {/* Interactive Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPlayAudio}
                className={`p-6 rounded-2xl font-bold shadow-lg transition-all flex flex-col items-center justify-center gap-3 ${musicPlaying ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'}`}
              >
                <div className="flex items-center gap-3">
                  <Music className="w-8 h-8" />
                  <span className="text-xl">
                    {musicPlaying ? 'Musik Ulang Tahun' : 'Putar Musik'}
                  </span>
                </div>
                <p className="text-sm opacity-90">
                  {musicPlaying ? '🎵 Dengarkan lagu spesial...' : '🎶 Klik untuk memutar'}
                </p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className={`p-6 rounded-2xl font-bold shadow-lg transition-all flex flex-col items-center justify-center gap-3 bg-white/80 hover:bg-white text-purple-600 border border-purple-200`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8" />
                  <span className="text-xl">
                    Lihat Lagi dari Awal
                  </span>
                </div>
                <p className="text-sm opacity-90">
                  🔄 Klik untuk mengulang kejutan
                </p>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Confetti Component
function Confetti() {
  const confettiColors = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b',
    '#ef4444', '#6366f1', '#0ea5e9', '#06b6d4', '#84cc16'
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
          {["🎉", "✨", "🎈", "🥳", "🎂", "🌟", "💫", "🎁", "🎊", "😊"][i]}
        </motion.div>
      ))}
    </div>
  );
}
