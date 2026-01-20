import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Sparkles, Music, Lock, Key, Moon, Sun, Flower2, Feather, Crown, MessageCircle, Camera, BookOpen, Gift } from "lucide-react";

export default function SurpriseForHer() {
  const [scene, setScene] = useState(0);
  const [password, setPassword] = useState("");
  const [showWrongPassword, setShowWrongPassword] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const audioRef = useRef(null);
  
  // Password spesial: nama + tanggal lahir (22-01-2007)
  const correctPassword = "22-01-2007";

  const nextScene = () => {
    if (scene < 6) {
      setScene(scene + 1);
    }
  };

  const prevScene = () => {
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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Initialize background music
    audioRef.current = new Audio("https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === correctPassword) {
      nextScene();
    } else {
      setShowWrongPassword(true);
      setTimeout(() => setShowWrongPassword(false), 2000);
    }
  };

  const renderScene = () => {
    switch(scene) {
      case 0:
        return <SecretEntrance 
          password={password}
          setPassword={setPassword}
          onSubmit={handlePasswordSubmit}
          showWrongPassword={showWrongPassword}
          darkMode={darkMode}
        />;
      case 1:
        return <MoonlitWhisper next={nextScene} darkMode={darkMode} />;
      case 2:
        return <StarryMemories next={nextScene} darkMode={darkMode} />;
      case 3:
        return <FlowerGarden next={nextScene} darkMode={darkMode} />;
      case 4:
        return <LoveLetters next={nextScene} darkMode={darkMode} />;
      case 5:
        return <WishesAndDreams next={nextScene} darkMode={darkMode} />;
      case 6:
        return <ForeverPromise next={nextScene} darkMode={darkMode} />;
      default:
        return <SecretEntrance 
          password={password}
          setPassword={setPassword}
          onSubmit={handlePasswordSubmit}
          showWrongPassword={showWrongPassword}
          darkMode={darkMode}
        />;
    }
  };

  return (
    <div className={`w-screen h-screen transition-all duration-1000 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-pink-50 via-rose-50 to-lavender-50'} overflow-hidden relative`}>
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${darkMode ? 'bg-purple-500/20' : 'bg-pink-300/20'} rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center ${darkMode ? 'bg-white/10 text-white' : 'bg-white/80 text-pink-600'} shadow-lg`}
        >
          <Music className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center ${darkMode ? 'bg-white/10 text-white' : 'bg-white/80 text-pink-600'} shadow-lg`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Navigation Controls */}
      {scene > 0 && scene < 6 && (
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevScene}
            className={`px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 ${darkMode ? 'bg-white/10 text-white' : 'bg-white/80 text-pink-600'} shadow-lg`}
          >
            ← Kembali
          </motion.button>
        </div>
      )}

      {/* Scene Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${darkMode ? 'bg-white/10' : 'bg-white/80'} shadow-lg`}>
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${scene === index ? (darkMode ? 'bg-purple-400' : 'bg-pink-500') : (darkMode ? 'bg-white/30' : 'bg-pink-200')} ${scene === index ? 'scale-125' : ''}`}
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

// SCENE 0: Secret Entrance
function SecretEntrance({ password, setPassword, onSubmit, showWrongPassword, darkMode }) {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (showWrongPassword) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  }, [showWrongPassword]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 relative"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${darkMode ? 'text-purple-400/20' : 'text-pink-300/20'}`}
            style={{
              left: `${(i * 12) % 100}%`,
              top: `${(i * 15) % 100}%`,
              fontSize: `${Math.random() * 40 + 30}px`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {["🔐", "💝", "✨", "🌸", "🔒", "💌", "🎀", "💕"][i]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className={`${darkMode ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/50' : 'bg-gradient-to-br from-white/90 to-pink-50/90'} backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${darkMode ? 'border-purple-500/30' : 'border-pink-200'}`}
        >
          {/* Lock Icon */}
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mb-6"
          >
            <div className={`p-4 rounded-2xl ${darkMode ? 'bg-purple-500/20' : 'bg-pink-100'}`}>
              <Lock className={`w-12 h-12 ${darkMode ? 'text-purple-300' : 'text-pink-400'}`} />
            </div>
          </motion.div>

          <div className="text-center space-y-4">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-pink-700'}`}
            >
              Tempat Rahasia Kita
            </motion.h1>
            <p className={`${darkMode ? 'text-purple-200' : 'text-pink-600'}`}>
              Hanya untuk dia yang lahir di bawah bintang 22-01-2007
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-purple-200' : 'text-pink-600'}`}>
                🔑 Masukkan Kata Sandi Cinta
              </label>
              <motion.input
                animate={isShaking ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Rahasia antara kita berdua..."
                className={`w-full p-4 rounded-xl backdrop-blur-sm border-2 transition-all ${darkMode ? 'bg-white/10 border-purple-500/50 text-white placeholder-purple-300/50 focus:border-purple-400' : 'bg-white/50 border-pink-300 text-pink-700 placeholder-pink-300 focus:border-pink-500'} outline-none`}
                autoComplete="off"
              />
            </div>

            <AnimatePresence>
              {showWrongPassword && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`text-center p-3 rounded-lg ${darkMode ? 'bg-rose-900/30 text-rose-300' : 'bg-rose-50 text-rose-500'}`}
                >
                  ❤️ Bukan itu sayang... coba ingat-ingat lagi rahasia kita
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white'} shadow-lg`}
            >
              <span className="flex items-center justify-center gap-3">
                <Key className="w-5 h-5" />
                Masuk ke Dunia Kita
                <Sparkles className="w-5 h-5" />
              </span>
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 pt-4 border-t border-white/10"
          >
            <p className={`text-center text-sm ${darkMode ? 'text-purple-300/70' : 'text-pink-500/70'}`}>
              💝 Dibuat khusus untuk seseorang yang spesial
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// SCENE 1: Moonlit Whisper
function MoonlitWhisper({ next, darkMode }) {
  const [messages, setMessages] = useState([]);
  const [showContinue, setShowContinue] = useState(false);

  const whisperMessages = [
    "Di bawah sinar rembulan yang sama...",
    "Aku selalu memikirkanmu...",
    "Cantikmu membuat bintang-bintang malu...",
    "Setiap detik tanpamu terasa hampa...",
    "Kamu adalah mimpi indah yang menjadi nyata..."
  ];

  useEffect(() => {
    const timers = [];
    let index = 0;

    const showMessage = () => {
      if (index < whisperMessages.length) {
        const timer = setTimeout(() => {
          setMessages(prev => [...prev, whisperMessages[index]]);
          index++;
          
          if (index === whisperMessages.length) {
            const continueTimer = setTimeout(() => {
              setShowContinue(true);
            }, 2000);
            timers.push(continueTimer);
          } else {
            showMessage();
          }
        }, 1800);
        timers.push(timer);
      }
    };

    showMessage();

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 relative cursor-pointer"
      onClick={showContinue ? next : undefined}
    >
      {/* Animated Moon and Stars */}
      <div className="absolute inset-0">
        {/* Moon */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className={`absolute top-10 right-10 w-32 h-32 rounded-full ${darkMode ? 'bg-gradient-to-br from-yellow-100 to-gray-300' : 'bg-gradient-to-br from-yellow-100 to-yellow-300'} shadow-2xl`}
        />
        
        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${darkMode ? 'bg-white' : 'bg-yellow-200'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              borderRadius: '50%',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Messages Container */}
      <div className="max-w-2xl w-full space-y-6 relative z-10">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl backdrop-blur-md ${darkMode ? 'bg-white/10' : 'bg-white/80'} shadow-lg`}
          >
            <p className={`text-xl ${darkMode ? 'text-white' : 'text-gray-700'} text-center`}>
              {message}
            </p>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {messages.length < whisperMessages.length && (
          <div className="flex justify-center">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  className={`w-2 h-2 rounded-full ${darkMode ? 'bg-purple-400' : 'bg-pink-400'}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Continue Prompt */}
        {showContinue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm ${darkMode ? 'bg-white/10 text-white' : 'bg-white/80 text-pink-600'}`}>
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Sentuh layar untuk melanjutkan...</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// SCENE 2: Starry Memories
function StarryMemories({ next, darkMode }) {
  const [selectedMemory, setSelectedMemory] = useState(null);

  const memories = [
    {
      id: 1,
      title: "Bulan Januari",
      icon: "❄️",
      color: darkMode ? "from-blue-900/50 to-cyan-900/50" : "from-blue-100 to-cyan-100",
      description: "Bulan kelahiranmu, saat dunia mendapatkan bintang baru"
    },
    {
      id: 2,
      title: "Angka 22",
      icon: "🌟",
      color: darkMode ? "from-purple-900/50 to-pink-900/50" : "from-purple-100 to-pink-100",
      description: "Tanggal spesial yang selalu kuingat dalam hatiku"
    },
    {
      id: 3,
      title: "Tahun 2007",
      icon: "🎀",
      color: darkMode ? "from-rose-900/50 to-red-900/50" : "from-rose-100 to-red-100",
      description: "Tahun keajaiban ketika kamu hadir di dunia"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 relative"
    >
      {/* Starry Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-white' : 'bg-yellow-300'}`} />
          </motion.div>
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
            <Star className={`w-8 h-8 ${darkMode ? 'text-yellow-300' : 'text-yellow-500'}`} />
            <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Bintang-Bintang Kenangan
            </h2>
            <Star className={`w-8 h-8 ${darkMode ? 'text-yellow-300' : 'text-yellow-500'}`} />
          </motion.div>
          <p className={`text-lg ${darkMode ? 'text-purple-200' : 'text-gray-600'}`}>
            Angka-angka spesial yang membuatmu begitu istimewa
          </p>
        </div>

        {/* Memories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${memory.color} backdrop-blur-sm shadow-xl cursor-pointer border ${darkMode ? 'border-white/20' : 'border-white/50'}`}
              onClick={() => setSelectedMemory(memory)}
            >
              <div className="text-center space-y-4">
                <div className="text-5xl">{memory.icon}</div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {memory.title}
                </h3>
                <p className={darkMode ? 'text-white/80' : 'text-gray-600'}>
                  {memory.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Memory Detail Modal */}
        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50"
              onClick={() => setSelectedMemory(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className={`max-w-md w-full rounded-3xl p-8 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-purple-900' : 'bg-gradient-to-br from-white to-pink-50'} shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center space-y-6">
                  <div className="text-6xl">{selectedMemory.icon}</div>
                  <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedMemory.title}
                  </h3>
                  <p className={`text-lg ${darkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                    {selectedMemory.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMemory(null)}
                    className={`px-6 py-3 rounded-full ${darkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-pink-500 hover:bg-pink-600 text-white'}`}
                  >
                    Tutup
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <div className="text-center pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className={`px-8 py-4 rounded-full text-lg font-bold ${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white'} shadow-lg flex items-center gap-3 mx-auto`}
          >
            <Flower2 className="w-5 h-5" />
            Lanjutkan ke Taman Bunga
            <Flower2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// SCENE 3: Flower Garden
function FlowerGarden({ next, darkMode }) {
  const [bloomedFlowers, setBloomedFlowers] = useState([]);
  const [showContinue, setShowContinue] = useState(false);

  const flowers = [
    { id: 1, emoji: "🌹", color: "text-rose-500", name: "Mawar Cinta" },
    { id: 2, emoji: "🌸", color: "text-pink-500", name: "Sakura Kelembutan" },
    { id: 3, emoji: "🌺", color: "text-fuchsia-500", name: "Kembang Sepatu" },
    { id: 4, emoji: "🌻", color: "text-yellow-500", name: "Matahari" },
    { id: 5, emoji: "🌼", color: "text-yellow-400", name: "Daisy" },
    { id: 6, emoji: "💐", color: "text-purple-500", name: "Buket" }
  ];

  const flowerMessages = [
    "Setiap bunga mewakili keindahan yang ada padamu",
    "Seperti mawar yang harum, kamu membuat hidupku wangi",
    "Seperti sakura yang lembut, kamu penuh kelembutan",
    "Kamu adalah taman paling indah dalam hidupku"
  ];

  useEffect(() => {
    // Auto-bloom flowers
    const timers = [];
    flowers.forEach((flower, index) => {
      const timer = setTimeout(() => {
        setBloomedFlowers(prev => [...prev, flower.id]);
        
        if (index === flowers.length - 1) {
          const continueTimer = setTimeout(() => {
            setShowContinue(true);
          }, 2000);
          timers.push(continueTimer);
        }
      }, index * 800);
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 relative"
    >
      {/* Garden Background */}
      <div className="absolute inset-0">
        {/* Grass */}
        <div className={`absolute bottom-0 w-full h-1/3 ${darkMode ? 'bg-green-900/30' : 'bg-green-200/50'}`} />
        
        {/* Floating petals */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {["🌸", "🌺", "🌼", "🍃"][Math.floor(Math.random() * 4)]}
          </motion.div>
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
            <Flower2 className={`w-8 h-8 ${darkMode ? 'text-pink-400' : 'text-pink-500'}`} />
            <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Taman Bunga Untukmu
            </h2>
            <Flower2 className={`w-8 h-8 ${darkMode ? 'text-pink-400' : 'text-pink-500'}`} />
          </motion.div>
          <p className={`text-lg ${darkMode ? 'text-purple-200' : 'text-gray-600'}`}>
            Setiap bunga adalah simbol keindahanmu
          </p>
        </div>

        {/* Flowers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {flowers.map((flower) => (
            <motion.div
              key={flower.id}
              initial={{ scale: 0 }}
              animate={bloomedFlowers.includes(flower.id) ? { scale: 1 } : {}}
              transition={{ type: "spring", damping: 15 }}
              whileHover={{ scale: 1.1 }}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm ${darkMode ? 'bg-white/5' : 'bg-white/50'} shadow-lg`}
            >
              <div className={`text-5xl ${bloomedFlowers.includes(flower.id) ? flower.color : 'text-gray-400'}`}>
                {flower.emoji}
              </div>
              <p className={`mt-2 text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                {flower.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {flowerMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 1 }}
              className={`p-4 rounded-xl backdrop-blur-sm ${darkMode ? 'bg-white/10' : 'bg-white/80'}`}
            >
              <p className={`text-center ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                {message}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Continue Prompt */}
        {showContinue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-8"
          >
            <div 
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm cursor-pointer ${darkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white/80 hover:bg-white text-pink-600'} transition-all`}
              onClick={next}
            >
              <Feather className="w-5 h-5" />
              <span className="font-medium">Lanjutkan membaca surat-surat cinta...</span>
              <Feather className="w-5 h-5" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// SCENE 4: Love Letters
function LoveLetters({ next, darkMode }) {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const letters = [
    {
      id: 1,
      title: "Surat Pertama",
      date: "Setiap Hari",
      content: "Setiap pagi saat aku bangun, hal pertama yang aku pikirkan adalah senyumanmu. Kamu adalah alasan mengapa hari-hari terasa lebih cerah dan mengapa mimpi-mimpi terasa lebih mungkin untuk digapai.",
      icon: "💌"
    },
    {
      id: 2,
      title: "Surat Kedua",
      date: "Setiap Malam",
      content: "Sebelum tidur, aku selalu berdoa untuk kebahagiaanmu. Semoga bintang-bintang membisikkan hal-hal indah ke dalam mimpimu, dan semoga kamu bangun dengan hati yang ringan dan senyuman yang cerah.",
      icon: "🌟"
    },
    {
      id: 3,
      title: "Surat Terakhir",
      date: "Selamanya",
      content: "Aku tidak tahu bagaimana cara yang tepat untuk mengungkapkan betapa berartinya kamu. Kata-kata terasa hambar dibandingkan perasaan yang sesungguhnya. Tapi yang aku tahu, aku ingin selalu ada untukmu, hari ini, besok, dan selamanya.",
      icon: "💝"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, [currentLetter]);

  const nextLetter = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (currentLetter < letters.length - 1) {
        setCurrentLetter(currentLetter + 1);
      } else {
        next();
      }
    }, 300);
  };

  const letter = letters[currentLetter];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 relative"
    >
      {/* Paper Texture Background */}
      <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-amber-900/20 to-rose-900/20' : 'bg-gradient-to-br from-amber-50/50 to-rose-50/50'}`}>
        {/* Paper texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="none"/%3E%3Cpath d="M20 20h60v60H20z" stroke="gray" stroke-width="0.5" fill="none"/%3E%3C/svg%3E')]" />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <motion.div
          key={letter.id}
          initial={{ rotate: -5, y: 50, opacity: 0 }}
          animate={isVisible ? { rotate: 0, y: 0, opacity: 1 } : {}}
          transition={{ type: "spring", damping: 20 }}
          className={`relative ${darkMode ? 'bg-gradient-to-br from-amber-900/30 to-rose-900/30' : 'bg-gradient-to-br from-amber-50 to-rose-50'} rounded-3xl p-8 shadow-2xl border ${darkMode ? 'border-amber-700/50' : 'border-amber-200'}`}
        >
          {/* Letter Decoration */}
          <div className="absolute top-4 left-4 text-2xl opacity-20">{letter.icon}</div>
          <div className="absolute bottom-4 right-4 text-2xl opacity-20">{letter.icon}</div>
          
          {/* Wax Seal */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-rose-800 flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
          </motion.div>

          {/* Letter Content */}
          <div className="space-y-6 pt-8">
            <div className="text-center space-y-2">
              <h3 className={`text-3xl font-bold ${darkMode ? 'text-amber-200' : 'text-rose-800'}`}>
                {letter.title}
              </h3>
              <p className={`${darkMode ? 'text-amber-300/70' : 'text-rose-600'}`}>{letter.date}</p>
            </div>

            <div className={`h-48 overflow-y-auto p-4 rounded-lg ${darkMode ? 'bg-black/20' : 'bg-white/50'}`}>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-amber-100' : 'text-gray-700'}`}>
                {letter.content}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <div className={`text-sm ${darkMode ? 'text-amber-300/70' : 'text-rose-600'}`}>
                {currentLetter + 1} dari {letters.length}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextLetter}
                className={`px-6 py-2 rounded-full flex items-center gap-2 ${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'}`}
              >
                {currentLetter < letters.length - 1 ? (
                  <>
                    Surat Berikutnya
                    <MessageCircle className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Lanjutkan
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// SCENE 5: Wishes and Dreams
function WishesAndDreams({ next, darkMode }) {
  const [wishes, setWishes] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const wishList = [
    "Semoga setiap hari membawa kebahagiaan baru untukmu",
    "Semoga impian-impianmu perlahan menjadi kenyataan",
    "Semoga kamu selalu dikelilingi oleh cinta dan kebaikan",
    "Semoga kesehatan dan keceriaan selalu menyertaimu",
    "Semoga kamu menemukan keajaiban dalam hal-hal kecil",
    "Semoga setiap langkahmu membawa kepada kebahagiaan",
    "Semoga hatimu selalu dipenuhi dengan kedamaian",
    "Semoga kamu selalu menjadi versi terbaik dari dirimu sendiri"
  ];

  useEffect(() => {
    const timers = [];
    wishList.forEach((wish, index) => {
      const timer = setTimeout(() => {
        setWishes(prev => [...prev, wish]);
        
        if (index === wishList.length - 1) {
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
      className="h-full flex flex-col items-center justify-center p-6 relative"
    >
      {/* Dreamy Background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${darkMode ? 'text-purple-300/20' : 'text-pink-200/50'}`}
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
            <Crown className={`w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
            <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Doa-Doa Untukmu
            </h2>
            <Crown className={`w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
          </motion.div>
          <p className={`text-lg ${darkMode ? 'text-purple-200' : 'text-gray-600'}`}>
            Harapan-harapan tulus dari lubuk hati terdalam
          </p>
        </div>

        {/* Wishes Container */}
        <div className="space-y-4 max-h-96 overflow-y-auto p-4">
          {wishes.map((wish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl backdrop-blur-sm ${darkMode ? 'bg-white/10' : 'bg-white/80'} shadow-lg`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-500/20' : 'bg-pink-100'}`}>
                  <Star className={`w-4 h-4 ${darkMode ? 'text-purple-300' : 'text-pink-500'}`} />
                </div>
                <p className={`flex-1 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  {wish}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Loading Animation */}
          {wishes.length < wishList.length && (
            <div className="flex justify-center py-4">
              <div className="flex items-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className={`w-2 h-2 rounded-full ${darkMode ? 'bg-purple-400' : 'bg-pink-400'}`}
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
              onClick={next}
              className={`px-8 py-4 rounded-full text-lg font-bold ${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white'} shadow-lg flex items-center gap-3`}
            >
              <BookOpen className="w-5 h-5" />
              Lanjutkan ke Janji Terakhir
              <BookOpen className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// SCENE 6: Forever Promise
function ForeverPromise({ next, darkMode }) {
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowFinalMessage(true), 1000);
    const timer2 = setTimeout(() => setShowHeart(true), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center p-6 relative"
    >
      {/* Final Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-rose-900/50' : 'bg-gradient-to-br from-pink-200/50 via-rose-100/50 to-purple-100/50'}`} />
        
        {/* Floating elements */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${darkMode ? 'text-purple-300/30' : 'text-pink-300/30'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {["💝", "💖", "💕", "💓", "💗", "💞", "💘"][i % 7]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full space-y-8 relative z-10">
        {/* Animated Heart */}
        {showHeart && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className={`w-48 h-48 rounded-full ${darkMode ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20' : 'bg-gradient-to-r from-pink-500/20 to-rose-500/20'} backdrop-blur-sm flex items-center justify-center`}>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-32 h-32 text-rose-500 fill-rose-500" />
                </motion.div>
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-rose-400/30"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
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
              <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Untuk Selamanya
              </h2>
              <div className={`space-y-4 text-lg ${darkMode ? 'text-purple-200' : 'text-gray-700'}`}>
                <p>
                  Terima kasih telah menjadi bagian dari hidupku...
                </p>
                  <p>
                  Terima kasih atas setiap senyuman, setiap tawa, setiap momen...
                  </p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                  Kamu akan selalu menjadi yang teristimewa...
                  </p>
                  <p className={`text-xl ${darkMode ? 'text-purple-300' : 'text-pink-600'}`}>
                  Selamat atas segala sesuatu yang telah kamu capai...
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Aku mencintaimu 💝
                </p>
              </div>
            </div>

            {/* Personal Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className={`pt-8 border-t ${darkMode ? 'border-white/20' : 'border-pink-200'}`}
            >
              <p className={`text-sm ${darkMode ? 'text-purple-300/70' : 'text-pink-600/70'}`}>
                Dibuat dengan sepenuh hati untuk seseorang yang spesial
              </p>
              <p className={`text-lg font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                - Untukmu, dari orang yang selalu memikirkanmu -
              </p>
              <p className={`text-sm mt-4 ${darkMode ? 'text-purple-300/50' : 'text-pink-500/50'}`}>
                22-01-2007 ~ Selamanya
              </p>
            </motion.div>

            {/* Restart Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className={`mt-8 px-8 py-3 rounded-full ${darkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white/80 hover:bg-white text-pink-600'} transition-all flex items-center gap-3 mx-auto`}
            >
              <Camera className="w-5 h-5" />
              Mulai dari Awal Lagi
              <Camera className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
