import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Sparkles, Music, Gift } from "lucide-react";

export default function BirthdayWebsite() {
  const [scene, setScene] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);
  const correctDate = "14-02-2003"; // GANTI dengan tanggal lahir sebenarnya

  const next = () => setScene(scene + 1);

  // Daftar foto (ganti dengan URL foto asli)
  const couplePhotos = [
    "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518568814500-bf0f8d125f47?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518568814500-bf0f8d125f48?w=800&auto=format&fit=crop"
  ];

  const herPhotos = [
    "https://images.unsplash.com/photo-1494790108755-2616c113b1db?w-800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop"
  ];

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (scene === 2) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [scene]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 overflow-hidden relative">
      {/* Background animasi */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-15 animate-ping"></div>
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Audio untuk pesan suara */}
      <audio ref={audioRef} src="/path-to-your-audio.mp3" />

      <AnimatePresence mode="wait">
        {/* SCENE 0: Login Page */}
        {scene === 0 && (
          <motion.div
            key="scene0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="h-full flex flex-col items-center justify-center p-6 relative z-10"
          >
            {/* Dekorasi */}
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
        )}

        {/* SCENE 1: Opening Cinematic */}
        {scene === 1 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/90 via-pink-900/80 to-rose-900/90 text-white p-8 relative overflow-hidden"
            onClick={next}
          >
            {/* Bintang-bintang */}
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

              <TypingText
                text={`Untuk ${name || "kekasihku"} yang membuat setiap detik terasa seperti dongeng...`}
                className="text-2xl md:text-3xl font-light leading-relaxed"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
                className="space-y-4"
              >
                <TypingText
                  text="Yang mengubah hari biasa menjadi cerita luar biasa..."
                  className="text-xl opacity-90"
                />
                <TypingText
                  text="Dan membuat hatiku selalu berdebar seperti pertama kali..."
                  className="text-xl opacity-90"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }}
                className="pt-8"
              >
                <p className="text-sm opacity-70 flex items-center justify-center gap-2 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  Sentuh layar untuk melanjutkan ke keajaiban...
                  <Sparkles className="w-4 h-4" />
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* SCENE 2: Birthday Animation */}
        {scene === 2 && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
            onClick={next}
          >
            {/* Background dengan hati-hati */}
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
              {/* Foto PNG dengan efek */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative"
              >
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-full p-1">
                  <div className="w-full h-full bg-white rounded-full overflow-hidden">
                    {/* Ganti dengan foto PNG Anda */}
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

              {/* Ucapan utama */}
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

              {/* Usia dengan animasi */}
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

              {/* Pesan kecil */}
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
        )}

        {/* SCENE 3: Gallery */}
        {scene === 3 && (
          <GalleryScene
            couplePhotos={couplePhotos}
            herPhotos={herPhotos}
            name={name}
            onNext={next}
          />
        )}

        {/* SCENE 4: Love Letter */}
        {scene === 4 && (
          <LoveLetterScene name={name} onNext={next} />
        )}

        {/* SCENE 5: Final & Gifts */}
        {scene === 5 && (
          <FinalScene
            name={name}
            onPlayAudio={playAudio}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Komponen TypingText yang lebih imut
function TypingText({ text, className = "" }) {
  const [display, setDisplay] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className={`${className} font-sans`}>
      <span className="relative">
        {display}
        {showCursor && (
          <span className="ml-1 animate-pulse">|</span>
        )}
      </span>
    </div>
  );
}

// Komponen Gallery
function GalleryScene({ couplePhotos, herPhotos, name, onNext }) {
  const [activeTab, setActiveTab] = useState("couple");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-pink-50"
      onClick={onNext}
    >
      {/* Header */}
      <div className="pt-8 px-6 text-center">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          📸 Galeri Kenangan Kita
        </motion.h2>
        <p className="text-gray-600 mt-2">Momen-momen terindah bersamamu</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-6 px-6">
        <button
          onClick={(e) => { e.stopPropagation(); setActiveTab("couple"); }}
          className={`px-6 py-2 rounded-full transition-all ${activeTab === "couple" 
            ? 'bg-pink-500 text-white shadow-lg' 
            : 'bg-white/50 text-gray-600'}`}
        >
          👫 Kita Berdua
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setActiveTab("her"); }}
          className={`px-6 py-2 rounded-full transition-all ${activeTab === "her" 
            ? 'bg-purple-500 text-white shadow-lg' 
            : 'bg-white/50 text-gray-600'}`}
        >
          ⭐ Bintang Utama
        </button>
      </div>

      {/* Gallery Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {activeTab === "couple" ? (
            couplePhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white"
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                  <span className="text-4xl">👫</span>
                </div>
              </motion.div>
            ))
          ) : (
            herPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white relative"
              >
                <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center">
                  <span className="text-4xl">💖</span>
                </div>
                {index === 0 && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs">
                    ✨ Favorit!
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          Sentuh layar untuk membaca surat cinta...
          <Sparkles className="w-4 h-4" />
        </p>
      </div>
    </motion.div>
  );
}

// Komponen Love Letter
function LoveLetterScene({ name, onNext }) {
  const messages = [
    `Dan di hari ulang tahunmu ini, ${name || "sayang"}, aku ingin mengucapkan terima kasih.`,
    "Terima kasih telah menjadi manusia yang begitu menginspirasi.",
    "Terima kasih untuk setiap tawa, setiap dukungan, dan setiap cara unikmu membuat hidupku lebih berwarna.",
    "Aku tidak bisa menunggu untuk mengisi lebih banyak halaman album kita dengan petualangan baru,",
    "impian yang kita kejar bersama, dan momen-momen sederhana yang terasa berarti karena kita lakukan bersama."
  ];

  const [visibleMessages, setVisibleMessages] = useState([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < messages.length) {
        setVisibleMessages(prev => [...prev, messages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50 to-pink-100 relative overflow-hidden"
      onClick={onNext}
    >
      {/* Dekorasi */}
      <div className="absolute top-10 left-10 animate-bounce">
        <Heart className="w-16 h-16 text-pink-300/30" />
      </div>
      <div className="absolute bottom-10 right-10 animate-pulse">
        <Star className="w-12 h-12 text-yellow-300/30" />
      </div>

      {/* Kontainer Surat */}
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 relative z-10">
        {/* Header Surat */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h3 className="text-2xl font-bold text-pink-700">💌 Surat Untukmu</h3>
          <p className="text-gray-600">Dari Mas Bagus, dengan cinta yang tak terhingga</p>
        </div>

        {/* Isi Surat */}
        <div className="space-y-6 min-h-[300px]">
          {visibleMessages.map((message, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              {message}
            </motion.p>
          ))}
        </div>

        {/* Tanda Tangan */}
        {visibleMessages.length === messages.length && (
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

        {/* Instruksi */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Sentuh layar untuk kejutan terakhir...
            <Sparkles className="w-4 h-4" />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Komponen Final Scene
function FinalScene({ name, onPlayAudio }) {
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

  const [visibleWishes, setVisibleWishes] = useState([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < wishes.length) {
        setVisibleWishes(prev => [...prev, wishes[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [wishes]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-blue-50 relative overflow-y-auto"
    >
      {/* Background animasi */}
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
        {/* Foto utama */}
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

        {/* Ucapan penutup */}
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

        {/* Doa-doa */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-200">
          <div className="space-y-3">
            {visibleWishes.map((wish, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-gray-700"
              >
                ✨ {wish}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Pesan cinta terakhir */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: wishes.length * 1.5 + 1 }}
          className="text-center"
        >
          <p className="text-2xl font-bold text-pink-600 mb-2">
            I love you dede cantiiikkk, kesayangan mas bagus 💕
          </p>
          <p className="text-gray-600">Kamu adalah anugerah terindah dalam hidupku</p>
        </motion.div>

        {/* Tombol interaktif */}
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

        {/* Footer */}
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

// Komponen Confetti
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

// Tambahkan styles CSS untuk animasi custom
const styles = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
