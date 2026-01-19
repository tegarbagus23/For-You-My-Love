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

  useEffect(() => {
    if (scene === 2) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [scene]);

  const renderScene = () => {
    switch(scene) {
      case 0:
        return (
          <Scene0 
            name={name}
            setName={setName}
            date={date}
            setDate={setDate}
            correctDate={correctDate}
            next={next}
          />
        );
      case 1:
        return <Scene1 name={name} next={next} />;
      case 2:
        return <Scene2 name={name} next={next} />;
      case 3:
        return <GalleryScene name={name} onNext={next} />;
      case 4:
        return <LoveLetterScene name={name} onNext={next} />;
      case 5:
        return <FinalScene name={name} />;
      default:
        return <Scene0 
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-300 rounded-full opacity-10"></div>
      </div>

      {showConfetti && <Confetti />}

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
        <motion.div
          key={scene}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="h-screen flex flex-col"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// SCENE 0: Login Page - SIMPLIFIED
function Scene0({ name, setName, date, setDate, correctDate, next }) {
  const isFormValid = name.trim() !== "" && date === correctDate;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      next();
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          🎀 Gerbang Cinta 🎀
        </h1>
        <p className="text-gray-600 mt-2">Masukkan kode rahasia untuk masuk</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-pink-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-pink-700 mb-2">
              💖 Nama Panggilan Spesial
            </label>
            <input
              type="text"
              placeholder="Masukkan nama panggilanmu..."
              className="w-full p-3 rounded-2xl border-2 border-pink-300 focus:border-pink-500 outline-none transition-all bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-pink-700 mb-2">
              📅 Tanggal Lahir (DD-MM-YYYY)
            </label>
            <input
              type="text"
              placeholder="Misal: 14-02-2003"
              className="w-full p-3 rounded-2xl border-2 border-pink-300 focus:border-pink-500 outline-none transition-all bg-white"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {date && date !== correctDate && (
            <p className="text-red-400 text-sm text-center p-2 bg-red-50 rounded-lg">
              ❤️ Coba ingat-ingat lagi sayangku! 😘
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full p-3 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
            isFormValid 
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-xl' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          Buka Dunia Cinta Kita ✨
          <Sparkles className="w-5 h-5" />
        </button>
      </form>

      <p className="text-gray-500 text-sm mt-8 text-center">
        🔒 Hanya untuk {name || "seseorang"} yang spesial
      </p>
    </div>
  );
}

// SCENE 1: Opening Cinematic - SIMPLIFIED
function Scene1({ name, next }) {
  const [textIndex, setTextIndex] = useState(0);
  
  const texts = [
    `Untuk ${name || "kekasihku"} yang membuat setiap detik terasa seperti dongeng...`,
    "Yang mengubah hari biasa menjadi cerita luar biasa...",
    "Dan membuat hatiku selalu berdebar seperti pertama kali..."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textIndex < texts.length - 1) {
        setTextIndex(textIndex + 1);
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [textIndex]);

  return (
    <div 
      className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/90 via-pink-900/80 to-rose-900/90 text-white p-4 cursor-pointer"
      onClick={next}
    >
      <div className="text-center space-y-8 max-w-2xl">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10 }}
          className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-2xl"
        >
          <Heart className="w-10 h-10 fill-white" />
        </motion.div>

        <div className="min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-xl md:text-2xl font-light leading-relaxed"
            >
              {texts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {textIndex === texts.length - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-8"
          >
            <p className="text-sm opacity-70 flex items-center justify-center gap-2 animate-pulse">
              <Sparkles className="w-4 h-4" />
              Sentuh layar untuk melanjutkan...
              <Sparkles className="w-4 h-4" />
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// SCENE 2: Birthday Animation - SIMPLIFIED
function Scene2({ name, next }) {
  return (
    <div 
      className="h-full flex flex-col items-center justify-center p-4 relative cursor-pointer"
      onClick={next}
    >
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="relative"
        >
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-full p-1">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className="text-4xl">😊</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            SELAMAT ULANG TAHUN!
          </h1>
          <p className="text-2xl text-pink-700 font-bold">
            {name || "Sayangku"} 💝
          </p>
        </div>

        <div className="inline-block">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-2 rounded-full text-xl font-bold shadow-lg">
            🎂 yang ke-23 🎂
          </div>
        </div>

        <div className="pt-8">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Sentuh layar untuk melihat kenangan indah kita...
            <Sparkles className="w-4 h-4" />
          </p>
        </div>
      </div>
    </div>
  );
}

// SCENE 3: Gallery Scene - CLEAN VERSION
function GalleryScene({ name, onNext }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const photoCollections = {
    photo1: {
      id: "photo1",
      title: "Momen Pertama Kita",
      description: "Hari itu ketika semuanya dimulai...",
      icon: "💕",
      color: "bg-gradient-to-br from-blue-200 to-purple-200",
      items: [
        { id: 1, type: "photo", text: "Ketemu pertama kali", icon: "📸" },
        { id: 2, type: "photo", text: "Makan bersama", icon: "🍽️" },
        { id: 3, type: "photo", text: "Foto candid lucu", icon: "😊" },
        { id: 4, type: "video", text: "Hari Spesial", icon: "🎬" },
        { id: 5, type: "photo", text: "Senyum manismu", icon: "😍" },
        { id: 6, type: "video", text: "Kenangan Liburan", icon: "✈️" },
      ]
    },
    photo2: {
      id: "photo2",
      title: "Pertama Kali Jalan",
      description: "Tanggal pertama yang tak terlupakan...",
      icon: "🌹",
      color: "bg-gradient-to-br from-pink-200 to-rose-200",
      items: [
        { id: 1, type: "photo", text: "Kamu yang cantik", icon: "💖" },
        { id: 2, type: "photo", text: "Nonton film pertama", icon: "🎬" },
        { id: 3, type: "video", text: "Makan Malam", icon: "🍷" },
        { id: 4, type: "photo", text: "Foto pertama kita", icon: "📸" },
        { id: 5, type: "photo", text: "Selfie lucu", icon: "🤳" },
        { id: 6, type: "video", text: "Liburan ke Pantai", icon: "🏖️" },
      ]
    },
    photo3: {
      id: "photo3",
      title: "Momen Spesial",
      description: "Hari-hari indah bersamamu...",
      icon: "✨",
      color: "bg-gradient-to-br from-purple-200 to-pink-200",
      items: [
        { id: 1, type: "photo", text: "Party ulang tahun", icon: "🎉" },
        { id: 2, type: "video", text: "Celebration Time!", icon: "🥳" },
        { id: 3, type: "photo", text: "Jalan-jalan", icon: "🚶‍♀️" },
        { id: 4, type: "photo", text: "Candid moment", icon: "😂" },
        { id: 5, type: "video", text: "Adventure", icon: "🏞️" },
        { id: 6, type: "photo", text: "Portrait terbaik", icon: "👑" },
      ]
    }
  };

  const photos = Object.values(photoCollections);

  const handlePhotoClick = (photoId) => {
    setSelectedPhoto(photoId);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPhoto(null);
  };

  const selectedCollection = selectedPhoto ? photoCollections[selectedPhoto] : null;

  return (
    <div className="h-full flex flex-col">
      <div className="pt-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-pink-600">
          📸 Galeri Kenangan Kita
        </h2>
        <p className="text-gray-600 mt-1">Klik foto untuk melihat koleksi lengkap</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer border-4 border-white relative"
              onClick={() => handlePhotoClick(photo.id)}
            >
              <div className={`w-full h-full ${photo.color} flex items-center justify-center`}>
                <span className="text-4xl">{photo.icon}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white">
                <p className="font-bold">{photo.title}</p>
                <p className="text-xs">6+ foto & video</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Pilih salah satu album untuk melihat kenangan lengkap
          </p>
        </div>
      </div>

      {/* Next Button */}
      <div className="p-4 text-center">
        <button
          onClick={onNext}
          className="bg-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-pink-600 transition-all"
        >
          Lanjut ke Surat Cinta →
        </button>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && selectedCollection && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{selectedCollection.title}</h3>
                  <p className="text-sm opacity-90">{selectedCollection.description}</p>
                </div>
                <button
                  onClick={handleClosePopup}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Main Photo */}
              <div className="mb-6">
                <div className={`aspect-video rounded-xl ${selectedCollection.color} flex items-center justify-center mb-2`}>
                  <span className="text-5xl">{selectedCollection.icon}</span>
                </div>
                <p className="text-center text-gray-600 text-sm italic">
                  "Momen spesial yang tak terlupakan"
                </p>
              </div>

              {/* Collection Items */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {selectedCollection.items.map((item) => (
                  <div
                    key={item.id}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 ${
                      item.type === 'video' 
                        ? 'bg-gradient-to-br from-blue-100 to-cyan-100' 
                        : 'bg-gradient-to-br from-pink-100 to-purple-100'
                    }`}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <p className="text-xs text-center font-medium">{item.text}</p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {item.type === 'video' ? 'VIDEO' : 'FOTO'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                <p className="text-gray-700 text-sm">
                  "Terima kasih untuk setiap momen indah bersamamu, {name || "sayang"}. 
                  Aku bersyukur atas setiap kenangan yang kita buat bersama." 💕
                </p>
                <p className="text-right text-pink-600 font-bold text-sm mt-2">
                  - Mas Bagus
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// SCENE 4: Love Letter Scene - SIMPLIFIED
function LoveLetterScene({ name, onNext }) {
  const [step, setStep] = useState(0);
  
  const messages = [
    `Dan di hari ulang tahunmu ini, ${name || "sayang"}, aku ingin mengucapkan terima kasih.`,
    "Terima kasih telah menjadi manusia yang begitu menginspirasi.",
    "Terima kasih untuk setiap tawa, setiap dukungan, dan setiap cara unikmu membuat hidupku lebih berwarna.",
    "Aku tidak bisa menunggu untuk mengisi lebih banyak halaman album kita dengan petualangan baru,",
    "impian yang kita kejar bersama, dan momen-momen sederhana yang terasa berarti karena kita lakukan bersama."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < messages.length) {
        setStep(step + 1);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [step]);

  const canContinue = step >= messages.length;

  return (
    <div 
      className="h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-rose-50 to-pink-100"
      onClick={canContinue ? onNext : undefined}
    >
      <div className="max-w-2xl w-full bg-white/90 rounded-2xl p-6 shadow-lg border border-pink-200">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-3">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <h3 className="text-xl font-bold text-pink-700">💌 Surat Untukmu</h3>
          <p className="text-gray-600 text-sm">Dari Mas Bagus, dengan cinta</p>
        </div>

        <div className="space-y-4 min-h-[200px]">
          {messages.slice(0, step).map((message, index) => (
            <p key={index} className="text-gray-700">
              {message}
            </p>
          ))}
          
          {step < messages.length && (
            <div className="flex justify-center">
              <div className="animate-pulse text-pink-400">●</div>
            </div>
          )}
        </div>

        {canContinue && (
          <div className="mt-6 pt-4 border-t border-pink-200">
            <p className="text-right text-pink-600 font-bold">
              Dengan cinta,<br />
              Mas Bagus 💖
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            {canContinue ? "Sentuh layar untuk kejutan terakhir..." : "Membaca pesan..."}
            <Sparkles className="w-4 h-4" />
          </p>
        </div>
      </div>
    </div>
  );
}

// SCENE 5: Final Scene - SIMPLIFIED
function FinalScene({ name }) {
  const [step, setStep] = useState(0);
  
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
    const timer = setTimeout(() => {
      if (step < wishes.length) {
        setStep(step + 1);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-pink-600">
            Selamat ulang tahun, {name || "sayang"}! 💝
          </h2>
          <p className="text-gray-700 mt-2">
            Ini adalah hari untuk merayakan kamu
          </p>
        </div>

        <div className="relative mx-auto w-48 h-48">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-50"></div>
          <div className="relative w-full h-full bg-white rounded-full p-2">
            <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
              <span className="text-5xl">💑</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 rounded-2xl p-4 shadow-lg">
          <div className="space-y-3">
            {wishes.slice(0, step).map((wish, index) => (
              <p key={index} className="text-gray-700">
                ✨ {wish}
              </p>
            ))}
            
            {step < wishes.length && (
              <div className="flex justify-center">
                <div className="animate-pulse text-pink-400">●</div>
              </div>
            )}
          </div>
        </div>

        {step >= wishes.length && (
          <div className="text-center">
            <p className="text-xl font-bold text-pink-600 mb-2">
              I love you dede cantiiikkk 💕
            </p>
            <p className="text-gray-600">Kamu adalah anugerah terindah</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3">
            <Music className="w-5 h-5" />
            Putar Pesan Suara
          </button>
          
          <button className="border-2 border-pink-400 text-pink-600 p-3 rounded-2xl font-bold flex items-center justify-center gap-3">
            <Gift className="w-5 h-5" />
            Lihat Hadiah 🎁
          </button>
        </div>

        <div className="text-center pt-6">
          <p className="text-sm text-gray-500">
            Made with 💖 by Mas Bagus
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date().toLocaleDateString('id-ID')}
          </p>
        </div>
      </div>
    </div>
  );
}

// Confetti Component - SIMPLIFIED
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#f472b6', '#ec4899', '#db2777'][Math.floor(Math.random() * 3)],
            animation: `fall ${Math.random() * 2 + 1}s linear infinite`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
