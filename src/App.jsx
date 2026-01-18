import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Sparkles, Music, Gift } from "lucide-react";

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

  const couplePhotos = [
    "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518568814500-bf0f8d125f47?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518568814500-bf0f8d125f48?w=800&auto=format&fit=crop"
  ];

  const herPhotos = [
    "https://images.unsplash.com/photo-1494790108755-2616c113b1db?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop"
  ];

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
        return (
          <GalleryScene
            key="scene3"
            couplePhotos={couplePhotos}
            herPhotos={herPhotos}
            name={name}
            onNext={next}
          />
        );
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
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-15 animate-ping"></div>
      </div>

      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {renderScene()}
      </AnimatePresence>
    </div>
  );
}

// SCENE 0: Login Page
function Scene0({ name, setName, date, setDate, correctDate, next }) {
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
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <AnimatePresence>
            {date && date !== correctDate && (
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
              onClick={next}
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

// SCENE 1: Opening Cinematic - FIXED (tidak berulang)
function Scene1({ name, next }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showInstruction, setShowInstruction] = useState(false);
  
  const texts = [
    `Untuk ${name || "kekasihku"} yang membuat setiap detik terasa seperti dongeng...`,
    "Yang mengubah hari biasa menjadi cerita luar biasa...",
    "Dan membuat hatiku selalu berdebar seperti pertama kali..."
  ];

  useEffect(() => {
    // Reset state ketika scene dimulai
    setCurrentTextIndex(0);
    setShowInstruction(false);
    
    let currentIndex = 0;
    const timers = [];
    
    const showNextText = () => {
      if (currentIndex < texts.length) {
        const timer = setTimeout(() => {
          setCurrentTextIndex(currentIndex);
          currentIndex++;
          if (currentIndex < texts.length) {
            showNextText();
          } else {
            // Setelah semua text muncul, tunjukkan instruksi
            const instructionTimer = setTimeout(() => {
              setShowInstruction(true);
            }, 1000);
            timers.push(instructionTimer);
          }
        }, 2500); // Delay 2.5 detik antar text
        
        timers.push(timer);
      }
    };
    
    // Mulai dengan delay kecil
    const startTimer = setTimeout(() => {
      showNextText();
    }, 500);
    timers.push(startTimer);
    
    // Cleanup semua timer
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [name]); // Hanya re-run jika name berubah

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/90 via-pink-900/80 to-rose-900/90 text-white p-8 relative overflow-hidden"
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
          <motion.p
            key={currentTextIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl md:text-3xl font-light leading-relaxed"
          >
            {texts[currentTextIndex]}
          </motion.p>
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
      className="h-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
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

// SCENE 3: Enhanced Gallery Scene with Popup
function GalleryScene({ couplePhotos, herPhotos, name, onNext }) {
  const [activeTab, setActiveTab] = useState("couple");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Data lengkap untuk setiap foto utama
  const photoCollections = {
    // Koleksi untuk foto pertama
    photo1: {
      mainPhoto: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&auto=format&fit=crop",
      title: "Momen Pertama Kita",
      description: "Hari itu ketika semuanya dimulai...",
      additionalPhotos: [
        { type: "photo", url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f47?w=400&auto=format&fit=crop", caption: "Ketika kita baru pertama kali ketemu" },
        { type: "photo", url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f48?w=400&auto=format&fit=crop", caption: "Makan bersama pertama kali" },
        { type: "photo", url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop", caption: "Foto candid kamu yang lucu" },
        { type: "video", thumbnail: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&auto=format&fit=crop", title: "Video 1: Hari Spesial Kita" },
        { type: "photo", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop", caption: "Senyum manismu" },
        { type: "video", thumbnail: "https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?w=400&auto=format&fit=crop", title: "Video 2: Kenangan Liburan" },
      ]
    },
    // Koleksi untuk foto kedua
    photo2: {
      mainPhoto: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f47?w=800&auto=format&fit=crop",
      title: "Pertama Kali Jalan Bareng",
      description: "Tanggal pertama yang tak terlupakan...",
      additionalPhotos: [
        { type: "photo", url: "https://images.unsplash.com/photo-1494790108755-2616c113b1db?w=400&auto=format&fit=crop", caption: "Kamu yang cantik di hari itu" },
        { type: "photo", url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop", caption: "Ketika kita nonton film pertama" },
        { type: "video", thumbnail: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&auto=format&fit=crop", title: "Video: Makan Malam Romantis" },
        { type: "photo", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop", caption: "Foto kita berdua yang pertama" },
        { type: "photo", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop", caption: "Selfie kita yang lucu" },
        { type: "video", thumbnail: "https://images.unsplash.com/photo-1529255484355-cb73c33c04bb?w=400&auto=format&fit=crop", title: "Video: Liburan ke Pantai" },
      ]
    },
    // Koleksi untuk foto ketiga
    photo3: {
      mainPhoto: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f48?w=800&auto=format&fit=crop",
      title: "Momen Spesial Kita",
      description: "Hari-hari indah bersamamu...",
      additionalPhotos: [
        { type: "photo", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop", caption: "Party ulang tahunmu" },
        { type: "video", thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop", title: "Video: Celebration Time!" },
        { type: "photo", url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop", caption: "Ketika kita jalan-jalan" },
        { type: "photo", url: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&auto=format&fit=crop", caption: "Candid moment yang lucu" },
        { type: "video", thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&auto=format&fit=crop", title: "Video: Adventure Together" },
        { type: "photo", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop", caption: "Portrait terbaikmu" },
      ]
    }
  };

  // Foto-foto utama yang ditampilkan di galeri
  const mainGalleryPhotos = [
    { id: "photo1", src: photoCollections.photo1.mainPhoto, title: "Momen Pertama" },
    { id: "photo2", src: photoCollections.photo2.mainPhoto, title: "Jalan Pertama" },
    { id: "photo3", src: photoCollections.photo3.mainPhoto, title: "Spesial" },
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

  return (
    <div className="h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-pink-50"
      >
        <div className="pt-8 px-6 text-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            📸 Galeri Kenangan Kita
          </motion.h2>
          <p className="text-gray-600 mt-2">Klik foto favorit untuk melihat lebih banyak kenangan</p>
        </div>

        <div className="flex justify-center gap-4 mt-6 px-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("couple");
            }}
            className={`px-6 py-2 rounded-full transition-all ${activeTab === "couple" 
              ? 'bg-pink-500 text-white shadow-lg' 
              : 'bg-white/50 text-gray-600'}`}
          >
            👫 Kita Berdua
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("her");
            }}
            className={`px-6 py-2 rounded-full transition-all ${activeTab === "her" 
              ? 'bg-purple-500 text-white shadow-lg' 
              : 'bg-white/50 text-gray-600'}`}
          >
            ⭐ {name || "Dia"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "couple" ? (
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
                    <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                      <span className="text-5xl">👫</span>
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
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-purple-700 mb-4">💝 Koleksi Spesial {name}</h3>
                <p className="text-gray-600">Momen-momen terindah {name || "dirimu"}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {herPhotos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white relative group"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center">
                      <span className="text-4xl">💖</span>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ✨ Favorit!
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                      <p className="text-white font-bold">Foto spesial untuk spesialmu</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Add some decorative empty frames */}
                {[3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="aspect-square rounded-2xl border-4 border-dashed border-gray-300 flex items-center justify-center"
                  >
                    <span className="text-gray-400 text-sm">Coming soon...</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            {activeTab === "couple" 
              ? "Klik salah satu foto untuk melihat koleksi lengkap" 
              : "Foto-foto spesial hanya untukmu"}
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
        {isPopupOpen && selectedPhoto && (
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
                      {photoCollections[selectedPhoto]?.title || "Koleksi Kenangan"}
                    </h3>
                    <p className="opacity-90">
                      {photoCollections[selectedPhoto]?.description || "Momen-momen indah kita"}
                    </p>
                  </div>
                  <button
                    onClick={handleClosePopup}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Foto utama */}
                <div className="mb-8">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-lg mb-4">
                    <div className="w-full h-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center">
                      <span className="text-7xl">👫</span>
                    </div>
                  </div>
                  <p className="text-center text-gray-600 italic">
                    "Foto utama yang mengawali semua kenangan indah kita"
                  </p>
                </div>

                {/* Grid foto dan video */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-pink-700 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Koleksi Lengkap ({photoCollections[selectedPhoto]?.additionalPhotos.length || 0} item)
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photoCollections[selectedPhoto]?.additionalPhotos.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`rounded-xl overflow-hidden shadow-lg border-2 border-white group cursor-pointer ${item.type === 'video' ? 'relative' : ''}`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {item.type === 'photo' ? (
                          <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
                            <span className="text-4xl mb-2">📸</span>
                            <p className="text-center text-gray-700 font-medium">{item.caption}</p>
                            <p className="text-sm text-gray-500 mt-2">Foto kenangan</p>
                          </div>
                        ) : (
                          <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 flex flex-col items-center justify-center p-4 relative">
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              VIDEO
                            </div>
                            <span className="text-4xl mb-2">🎬</span>
                            <p className="text-center text-gray-700 font-medium">{item.title}</p>
                            <div className="mt-4 flex items-center justify-center">
                              <button className="bg-black/20 hover:bg-black/30 rounded-full p-3 transition-all">
                                ▶️
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

// SCENE 4: Love Letter Scene - FIXED (tidak berulang)
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
    // Reset state ketika scene dimulai
    setVisibleMessages([]);
    setIsComplete(false);
    
    let currentIndex = 0;
    const timers = [];
    
    const showNextMessage = () => {
      if (currentIndex < messages.length) {
        const timer = setTimeout(() => {
          setVisibleMessages(prev => [...prev, messages[currentIndex]]);
          currentIndex++;
          
          if (currentIndex < messages.length) {
            showNextMessage();
          } else {
            // Setelah semua pesan muncul
            const completeTimer = setTimeout(() => {
              setIsComplete(true);
            }, 1000);
            timers.push(completeTimer);
          }
        }, 2000); // Delay 2 detik antar pesan
        
        timers.push(timer);
      }
    };
    
    // Mulai dengan delay kecil
    const startTimer = setTimeout(() => {
      showNextMessage();
    }, 500);
    timers.push(startTimer);
    
    // Cleanup semua timer
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [name]); // Hanya re-run jika name berubah

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50 to-pink-100 relative overflow-hidden"
      onClick={onNext}
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
          
          {/* Placeholder untuk pesan yang belum muncul */}
          {visibleMessages.length < messages.length && (
            <div className="h-6"></div>
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

// SCENE 5: Final Scene - FIXED (tidak berulang)
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
    // Reset state ketika scene dimulai
    setVisibleWishes([]);
    setShowFinalMessage(false);
    
    let currentIndex = 0;
    const timers = [];
    
    const showNextWish = () => {
      if (currentIndex < wishes.length) {
        const timer = setTimeout(() => {
          setVisibleWishes(prev => [...prev, wishes[currentIndex]]);
          currentIndex++;
          
          if (currentIndex < wishes.length) {
            showNextWish();
          } else {
            // Setelah semua wish muncul, tampilkan final message
            const finalTimer = setTimeout(() => {
              setShowFinalMessage(true);
            }, 1500);
            timers.push(finalTimer);
          }
        }, 1500); // Delay 1.5 detik antar wish
        
        timers.push(timer);
      }
    };
    
    // Mulai dengan delay kecil
    const startTimer = setTimeout(() => {
      showNextWish();
    }, 500);
    timers.push(startTimer);
    
    // Cleanup semua timer
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []); // Empty dependency array - hanya run sekali

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
            
            {/* Placeholder untuk wish yang belum muncul */}
            {visibleWishes.length < wishes.length && (
              <div className="h-4"></div>
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
