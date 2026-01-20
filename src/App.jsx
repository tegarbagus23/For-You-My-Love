import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Sparkles, Music, Gift, X } from "lucide-react";

export default function BirthdayWebsite() {
  const [scene, setScene] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const correctDate = "14-02-2003";

  const next = () => {
    if (scene < 5) {
      setScene(scene + 1);
    }
  };

  const prev = () => {
    if (scene > 0) {
      setScene(scene - 1);
    }
  };

  const playAudio = () => {
    console.log("Audio diputar untuk:", name);
    // new Audio("/happy-birthday.mp3").play();
  };

  useEffect(() => {
    if (scene === 2) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
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
      .animate-spin-slow {
        animation: spin-slow 8s linear infinite;
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
        return <LoveLetterScene key="scene4" name={name} onNext={next} />;
      case 5:
        return <FinalScene key="scene5" name={name} onPlayAudio={playAudio} />;
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
    <div className="w-screen h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-300 rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-15"></div>
      </div>

      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Navigation Controls */}
      {scene > 0 && scene < 5 && (
        <div className="absolute top-4 left-4 z-20">
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
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${scene === index ? 'bg-pink-500' : 'bg-pink-200'}`}
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

// SCENE 0: Login Page
function Scene0({ name, setName, date, setDate, correctDate, next }) {
  const [isIncorrect, setIsIncorrect] = useState(false);

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    setIsIncorrect(value && value !== correctDate);
  };

  const handleSubmit = () => {
    if (date === correctDate && name) {
      next();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="h-full flex flex-col items-center justify-center p-6 relative z-10"
    >
      <div className="absolute top-10 animate-bounce">
        <Heart className="w-12 h-12 text-pink-400 fill-pink-400" />
      </div>
      <div className="absolute bottom-20 right-10 animate-spin-slow">
        <Sparkles className="w-8 h-8 text-yellow-400" />
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          🎀 Gerbang Cinta 🎀
        </h1>
        <p className="text-gray-600 mt-2">Masukkan kode rahasia untuk masuk ke dunia kita</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-pink-200"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-pink-700 mb-2">
              💖 Nama Panggilan Spesial
            </label>
            <input
              type="text"
              placeholder="Masukkan nama panggilanmu..."
              className="w-full p-4 rounded-2xl border-2 border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-pink-700 mb-2">
              📅 Tanggal Lahir (DD-MM-YYYY)
            </label>
            <input
              type="text"
              placeholder="Misal: 14-02-2003"
              className="w-full p-4 rounded-2xl border-2 border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white/50"
              value={date}
              onChange={handleDateChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <AnimatePresence>
            {isIncorrect && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-sm text-center p-2 bg-red-50 rounded-lg"
              >
                ❤️ Hmm... coba ingat-ingat lagi sayangku! Mungkin ada yang keliru? 😘
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {date === correctDate && name && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Buka Dunia Cinta Kita ✨
              <Sparkles className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-gray-500 text-sm mt-8 text-center"
      >
        🔒 Hanya untuk {name || "seseorang"} yang paling spesial
      </motion.p>
    </motion.div>
  );
}

// SCENE 1: Opening Cinematic
function Scene1({ name, next }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showInstruction, setShowInstruction] = useState(false);
  
  const texts = [
    `Untuk ${name || "kekasihku"} yang membuat setiap detik terasa seperti dongeng...`,
    "Yang mengubah hari biasa menjadi cerita luar biasa...",
    "Dan membuat hatiku selalu berdebar seperti pertama kali..."
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
            }, 1000);
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
    }, 500);
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
      className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/90 via-pink-900/80 to-rose-900/90 text-white p-8 relative overflow-hidden cursor-pointer"
      onClick={next}
    >
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 relative z-10 max-w-2xl">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10 }}
          className="mx-auto w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-2xl"
        >
          <Heart className="w-12 h-12 fill-white" />
        </motion.div>

        <div className="min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl md:text-3xl font-light leading-relaxed"
            >
              {texts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {showInstruction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-8"
          >
            <p className="text-sm opacity-70 flex items-center justify-center gap-2 animate-pulse">
              <Sparkles className="w-4 h-4" />
              Sentuh layar untuk melanjutkan ke keajaiban...
              <Sparkles className="w-4 h-4" />
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// SCENE 2: Birthday Animation
function Scene2({ name, next }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 relative overflow-hidden cursor-pointer"
      onClick={next}
    >
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 24 + 16}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-6 relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative"
        >
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-full p-1">
            <div className="w-full h-full bg-white rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-4xl">😊</span>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-16 h-16"
          >
            <Star className="w-16 h-16 text-yellow-400 fill-yellow-400" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="space-y-2"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            SELAMAT ULANG TAHUN!
          </h1>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="text-3xl text-pink-700 font-bold"
          >
            {name || "Sayangku"} 💝
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="inline-block"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg">
            🎂 yang ke-23 🎂
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="pt-8"
        >
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Sentuh layar untuk melihat kenangan indah kita...
            <Sparkles className="w-4 h-4" />
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// SCENE 3: Enhanced Gallery Scene
function GalleryScene({ name, onNext }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const photoCollections = {
    photo1: {
      id: "photo1",
      title: "Momen Pertama Kita",
      description: "Hari itu ketika semuanya dimulai...",
      icon: "💕",
      color: "from-blue-300 to-purple-300",
      additionalPhotos: [
        { id: 1, type: "photo", caption: "Ketika kita baru pertama kali ketemu", icon: "📸" },
        { id: 2, type: "photo", caption: "Makan bersama pertama kali", icon: "🍽️" },
        { id: 3, type: "photo", caption: "Foto candid kamu yang lucu", icon: "😊" },
        { id: 4, type: "video", title: "Video 1: Hari Spesial Kita", icon: "🎬" },
        { id: 5, type: "photo", caption: "Senyum manismu", icon: "😍" },
        { id: 6, type: "video", title: "Video 2: Kenangan Liburan", icon: "✈️" },
      ]
    },
    photo2: {
      id: "photo2",
      title: "Pertama Kali Jalan Bareng",
      description: "Tanggal pertama yang tak terlupakan...",
      icon: "🌹",
      color: "from-pink-300 to-rose-300",
      additionalPhotos: [
        { id: 1, type: "photo", caption: "Kamu yang cantik di hari itu", icon: "💖" },
        { id: 2, type: "photo", caption: "Ketika kita nonton film pertama", icon: "🎬" },
        { id: 3, type: "video", title: "Video: Makan Malam Romantis", icon: "🍷" },
        { id: 4, type: "photo", caption: "Foto kita berdua yang pertama", icon: "📸" },
        { id: 5, type: "photo", caption: "Selfie kita yang lucu", icon: "🤳" },
        { id: 6, type: "video", title: "Video: Liburan ke Pantai", icon: "🏖️" },
      ]
    },
    photo3: {
      id: "photo3",
      title: "Momen Spesial Kita",
      description: "Hari-hari indah bersamamu...",
      icon: "✨",
      color: "from-purple-300 to-pink-300",
      additionalPhotos: [
        { id: 1, type: "photo", caption: "Party ulang tahunmu", icon: "🎉" },
        { id: 2, type: "video", title: "Video: Celebration Time!", icon: "🥳" },
        { id: 3, type: "photo", caption: "Ketika kita jalan-jalan", icon: "🚶‍♀️" },
        { id: 4, type: "photo", caption: "Candid moment yang lucu", icon: "😂" },
        { id: 5, type: "video", title: "Video: Adventure Together", icon: "🏞️" },
        { id: 6, type: "photo", caption: "Portrait terbaikmu", icon: "👑" },
      ]
    }
  };

  const mainGalleryPhotos = [
    photoCollections.photo1,
    photoCollections.photo2,
    photoCollections.photo3,
  ];

  const handlePhotoClick = (photoId) => {
    setSelectedPhoto(photoId);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => {
      setSelectedPhoto(null);
    }, 300);
  };

  const selectedCollection = selectedPhoto ? photoCollections[selectedPhoto] : null;

  return (
    <div className="h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-pink-50"
      >
        <div className="pt-12 px-6 text-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            📸 Galeri Kenangan Kita
          </motion.h2>
          <p className="text-gray-600 mt-2">Klik foto favorit untuk melihat lebih banyak kenangan</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-pink-700 mb-4">📁 Album Bersama</h3>
              <p className="text-gray-600">Kumpulan momen indah kita berdua</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mainGalleryPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-xl cursor-pointer border-4 border-white relative group"
                  onClick={() => handlePhotoClick(photo.id)}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${photo.color} flex items-center justify-center`}>
                    <span className="text-5xl">{photo.icon}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 p-4 rounded-lg shadow-lg">
                      <p className="text-pink-600 font-bold">Klik untuk lihat lebih banyak!</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                    <p className="font-bold">{photo.title}</p>
                    <p className="text-sm opacity-90">📁 6+ foto & video</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white/50 rounded-2xl p-6 mt-8">
              <h4 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Cara Menggunakan Galeri
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Klik salah satu foto di atas untuk membuka koleksi lengkap
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Setiap foto utama memiliki 6+ foto dan video kenangan
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Scroll untuk melihat semua konten dalam popup
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Total koleksi: {Object.keys(photoCollections).length * 7} foto & video
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Klik area mana saja (kecuali tombol) untuk melanjutkan...
            <Sparkles className="w-4 h-4" />
          </p>
        </div>
      </motion.div>
      
      {/* Transparent clickable overlay untuk next scene */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 cursor-pointer"
        onClick={onNext}
        title="Klik untuk lanjut ke scene berikutnya"
      />

      {/* Popup untuk menampilkan koleksi lengkap */}
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
              <div className="p-6 border-b border-pink-200 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedCollection.title}
                    </h3>
                    <p className="opacity-90">
                      {selectedCollection.description}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClosePopup}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Foto utama */}
                <div className="mb-8">
                  <div className={`aspect-video rounded-2xl overflow-hidden shadow-lg mb-4 bg-gradient-to-br ${selectedCollection.color} flex items-center justify-center`}>
                    <span className="text-7xl">{selectedCollection.icon}</span>
                  </div>
                  <p className="text-center text-gray-600 italic">
                    "Foto utama yang mengawali semua kenangan indah kita"
                  </p>
                </div>

                {/* Grid foto dan video */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-pink-700 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Koleksi Lengkap ({selectedCollection.additionalPhotos.length} item)
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedCollection.additionalPhotos.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-xl overflow-hidden shadow-lg border-2 border-white group cursor-pointer ${item.type === 'video' ? 'relative' : ''}`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {item.type === 'photo' ? (
                          <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
                            <span className="text-4xl mb-2">{item.icon}</span>
                            <p className="text-center text-gray-700 font-medium">{item.caption}</p>
                            <p className="text-sm text-gray-500 mt-2">Foto kenangan</p>
                          </div>
                        ) : (
                          <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 flex flex-col items-center justify-center p-4 relative">
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              VIDEO
                            </div>
                            <span className="text-4xl mb-2">{item.icon}</span>
                            <p className="text-center text-gray-700 font-medium">{item.title}</p>
                            <div className="mt-4 flex items-center justify-center">
                              <button className="bg-black/20 hover:bg-black/30 rounded-full p-3 transition-all">
                                <span className="text-xl">▶️</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Pesan romantis */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                    <h5 className="text-lg font-bold text-pink-700">Pesan dari Mas Bagus</h5>
                  </div>
                  <p className="text-gray-700 italic">
                    "Setiap foto dan video ini adalah bukti betapa indahnya perjalanan kita bersama. 
                    Terima kasih telah menjadi bagian dari setiap momen berharga ini, {name || "sayang"}. 
                    Aku bersyukur bisa merekam setiap tawa, setiap cerita, dan setiap perkembangan kita."
                  </p>
                  <p className="text-right text-pink-600 font-bold mt-4">
                    - Mas Bagus 💕
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SCENE 4: Love Letter Scene
function LoveLetterScene({ name, onNext }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const messages = [
    `Dan di hari ulang tahunmu ini, ${name || "sayang"}, aku ingin mengucapkan terima kasih.`,
    "Terima kasih telah menjadi manusia yang begitu menginspirasi.",
    "Terima kasih untuk setiap tawa, setiap dukungan, dan setiap cara unikmu membuat hidupku lebih berwarna.",
    "Aku tidak bisa menunggu untuk mengisi lebih banyak halaman album kita dengan petualangan baru,",
    "impian yang kita kejar bersama, dan momen-momen sederhana yang terasa berarti karena kita lakukan bersama."
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
            }, 1000);
            timers.push(completeTimer);
          } else {
            showMessage(index + 1);
          }
        }, 2000);
        timers.push(timer);
      }
    };
    
    const startTimer = setTimeout(() => {
      showMessage(0);
    }, 500);
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
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50 to-pink-100 relative overflow-hidden cursor-pointer"
      onClick={isComplete ? onNext : undefined}
    >
      <div className="absolute top-10 left-10 animate-bounce">
        <Heart className="w-16 h-16 text-pink-300/30" />
      </div>
      <div className="absolute bottom-10 right-10 animate-pulse">
        <Star className="w-12 h-12 text-yellow-300/30" />
      </div>

      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h3 className="text-2xl font-bold text-pink-700">💌 Surat Untukmu</h3>
          <p className="text-gray-600">Dari Mas Bagus, dengan cinta yang tak terhingga</p>
        </div>

        <div className="space-y-6 min-h-[300px]">
          {visibleMessages.map((message, index) => (
            <motion.p
              key={`message-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              {message}
            </motion.p>
          ))}
          
          {visibleMessages.length < messages.length && (
            <div className="flex items-center justify-center h-6">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-pink-400"
              >
                ●
              </motion.div>
            </div>
          )}
        </div>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-8 border-t border-pink-200"
          >
            <p className="text-right text-pink-600 font-bold text-xl">
              Dengan cinta,<br />
              Mas Bagus 💖
            </p>
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            {isComplete ? "Sentuh layar untuk kejutan terakhir..." : "Tunggu pesan berikutnya..."}
            <Sparkles className="w-4 h-4" />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// SCENE 5: Final Scene
function FinalScene({ name, onPlayAudio }) {
  const [visibleWishes, setVisibleWishes] = useState([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  
  const wishes = [
    "Semoga kamu selalu diberikan kesehatan yang prima,",
    "semangat yang tak pernah padam, dan hati yang selalu muda.",
    "Agar kamu bisa terus menjelajahi dunia",
    "dan menikmati setiap petualangan indah yang menantimu.",
    "Aku berdoa agar semua impian dan cita-citamu semakin dekat untuk digenggam.",
    "Semoga kamu diberi kekuatan untuk mengejar apa yang membuat jiwa bersemangat,",
    "dan keberanian untuk melewati setiap rintangan.",
    "Aku akan selalu di sini untuk mendukungmu.",
    "Aku di sini untuk semuanya."
  ];

  useEffect(() => {
    setVisibleWishes([]);
    setShowFinalMessage(false);
    
    const timers = [];
    let currentIndex = 0;
    
    const showWish = (index) => {
      if (index < wishes.length) {
        const timer = setTimeout(() => {
          setVisibleWishes(prev => [...prev, wishes[index]]);
          if (index === wishes.length - 1) {
            const finalTimer = setTimeout(() => {
              setShowFinalMessage(true);
            }, 1500);
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
    }, 500);
    timers.push(startTimer);
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-blue-50 relative overflow-y-auto"
    >
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
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
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {["💖", "✨", "🎀", "🎉", "🌸"][i % 5]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-2xl w-full space-y-8 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="relative mx-auto w-64 h-64"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-50"></div>
          <div className="relative w-full h-full bg-white rounded-full p-2">
            <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
              <span className="text-6xl">💑</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -left-4"
          >
            <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
          </motion.div>
        </motion.div>

        <div className="text-center space-y-4">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            Selamat ulang tahun, {name || "sayang"}! 💝
          </motion.h2>
          
          <p className="text-lg text-gray-700">
            Ini adalah hari untuk merayakan kamu: setiap versi dirimu yang dulu, yang sekarang, dan yang akan datang.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200">
          <div className="space-y-3">
            {visibleWishes.map((wish, index) => (
              <motion.p
                key={`wish-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-gray-700"
              >
                ✨ {wish}
              </motion.p>
            ))}
            
            {visibleWishes.length < wishes.length && (
              <div className="flex items-center justify-center h-4">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-pink-400"
                >
                  ●
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-pink-600 mb-2">
              I love you dede cantiiikkk, kesayangan mas bagus 💕
            </p>
            <p className="text-gray-600">Kamu adalah anugerah terindah dalam hidupku</p>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAudio}
            className="flex-1 max-w-xs bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3"
          >
            <Music className="w-5 h-5" />
            Putar Pesan Suara dari Mas Bagus
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 max-w-xs border-2 border-pink-400 text-pink-600 p-4 rounded-2xl font-bold flex items-center justify-center gap-3"
          >
            <Gift className="w-5 h-5" />
            Lihat Hadiah Rahasia 🎁
          </motion.button>
        </div>

        <div className="text-center pt-8">
          <p className="text-sm text-gray-500">
            Made with 💖 by Mas Bagus, for the only {name || "Dede"} in the universe.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Confetti Component
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: [
              '#f472b6', '#ec4899', '#db2777', '#c026d3', '#a855f7'
            ][Math.floor(Math.random() * 5)],
          }}
          initial={{
            y: -20,
            x: Math.random() * 100 - 50,
            rotate: 0,
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: [0, Math.random() * 200 - 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
