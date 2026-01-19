import { useState, useEffect } from "react";

export default function BirthdayWebsite() {
  const [scene, setScene] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
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
        return <GalleryScene name={name} next={next} />;
      case 4:
        return <LoveLetterScene name={name} next={next} />;
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* Navigation */}
      {scene > 0 && scene < 5 && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={prev}
            className="bg-white/80 px-4 py-2 rounded-full shadow-lg border border-pink-200 text-pink-600 text-sm font-medium"
          >
            ← Kembali
          </button>
        </div>
      )}

      {/* Scene Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-lg border border-pink-200">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${scene === index ? 'bg-pink-500' : 'bg-pink-200'}`}
            />
          ))}
        </div>
      </div>

      {renderScene()}
    </div>
  );
}

// SCENE 0: Login Page
function Scene0({ name, setName, date, setDate, correctDate, next }) {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Masukkan nama panggilanmu");
      return;
    }
    if (date !== correctDate) {
      setError("Tanggal lahir salah! Coba ingat-ingat lagi");
      return;
    }
    next();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">
            🎀 Gerbang Cinta 🎀
          </h1>
          <p className="text-gray-600">Masukkan kode rahasia untuk masuk</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg border border-pink-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">
                💖 Nama Panggilan Spesial
              </label>
              <input
                type="text"
                placeholder="Masukkan nama panggilanmu..."
                className="w-full p-3 rounded-xl border-2 border-pink-300 focus:border-pink-500 outline-none"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">
                📅 Tanggal Lahir (DD-MM-YYYY)
              </label>
              <input
                type="text"
                placeholder="Misal: 14-02-2003"
                className="w-full p-3 rounded-xl border-2 border-pink-300 focus:border-pink-500 outline-none"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setError("");
                }}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
                ❤️ {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity"
          >
            ✨ Buka Dunia Cinta Kita ✨
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          🔒 Hanya untuk {name || "seseorang"} yang spesial
        </p>
      </div>
    </div>
  );
}

// SCENE 1: Opening
function Scene1({ name, next }) {
  const [textIndex, setTextIndex] = useState(0);
  
  const texts = [
    `Untuk ${name || "kekasihku"} yang membuat setiap detik terasa seperti dongeng...`,
    "Yang mengubah hari biasa menjadi cerita luar biasa...",
    "Dan membuat hatiku selalu berdebar seperti pertama kali..."
  ];

  useEffect(() => {
    if (textIndex < texts.length - 1) {
      const timer = setTimeout(() => {
        setTextIndex(textIndex + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [textIndex]);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900 text-white flex items-center justify-center p-4 cursor-pointer"
      onClick={textIndex === texts.length - 1 ? next : undefined}
    >
      <div className="max-w-2xl text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-2xl mb-8">
          <span className="text-3xl">❤️</span>
        </div>

        <div className="min-h-[100px] flex items-center justify-center mb-8">
          <p className="text-xl md:text-2xl leading-relaxed">
            {texts[textIndex]}
          </p>
        </div>

        {textIndex === texts.length - 1 && (
          <p className="text-sm opacity-70 animate-pulse">
            ✨ Sentuh layar untuk melanjutkan...
          </p>
        )}
      </div>
    </div>
  );
}

// SCENE 2: Birthday
function Scene2({ name, next }) {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-50 to-rose-50 cursor-pointer"
      onClick={next}
    >
      <div className="text-center space-y-6">
        <div className="w-40 h-40 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-full p-2">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <span className="text-4xl">😊</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
            SELAMAT ULANG TAHUN!
          </h1>
          <p className="text-2xl text-pink-700 font-bold mt-2">
            {name || "Sayangku"} 💝
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-2 rounded-full text-xl font-bold inline-block">
          🎂 yang ke-23 🎂
        </div>

        <p className="text-gray-600 text-sm mt-8">
          ✨ Sentuh layar untuk melihat kenangan indah kita...
        </p>
      </div>
    </div>
  );
}

// SCENE 3: Gallery
function GalleryScene({ name, next }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const albums = [
    {
      id: 1,
      title: "Momen Pertama Kita",
      emoji: "💕",
      color: "from-blue-200 to-purple-200",
      description: "Hari itu ketika semuanya dimulai...",
      photos: [
        { id: 1, type: "photo", title: "Ketemu pertama", emoji: "📸" },
        { id: 2, type: "photo", title: "Makan bersama", emoji: "🍽️" },
        { id: 3, type: "photo", title: "Foto candid", emoji: "😊" },
        { id: 4, type: "video", title: "Video spesial", emoji: "🎬" },
        { id: 5, type: "photo", title: "Senyum manis", emoji: "😍" },
        { id: 6, type: "video", title: "Liburan", emoji: "✈️" },
      ]
    },
    {
      id: 2,
      title: "Pertama Kali Jalan",
      emoji: "🌹",
      color: "from-pink-200 to-rose-200",
      description: "Tanggal pertama yang tak terlupakan...",
      photos: [
        { id: 1, type: "photo", title: "Kamu cantik", emoji: "💖" },
        { id: 2, type: "photo", title: "Nonton film", emoji: "🎬" },
        { id: 3, type: "video", title: "Makan malam", emoji: "🍷" },
        { id: 4, type: "photo", title: "Foto pertama", emoji: "📸" },
        { id: 5, type: "photo", title: "Selfie lucu", emoji: "🤳" },
        { id: 6, type: "video", title: "Pantai", emoji: "🏖️" },
      ]
    },
    {
      id: 3,
      title: "Momen Spesial",
      emoji: "✨",
      color: "from-purple-200 to-pink-200",
      description: "Hari-hari indah bersamamu...",
      photos: [
        { id: 1, type: "photo", title: "Party", emoji: "🎉" },
        { id: 2, type: "video", title: "Celebration", emoji: "🥳" },
        { id: 3, type: "photo", title: "Jalan-jalan", emoji: "🚶‍♀️" },
        { id: 4, type: "photo", title: "Candid", emoji: "😂" },
        { id: 5, type: "video", title: "Adventure", emoji: "🏞️" },
        { id: 6, type: "photo", title: "Portrait", emoji: "👑" },
      ]
    }
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-2">
            📸 Galeri Kenangan Kita
          </h2>
          <p className="text-gray-600">Klik album untuk melihat koleksi lengkap</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {albums.map((album) => (
            <div
              key={album.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-pink-200 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedAlbum(album)}
            >
              <div className={`h-40 bg-gradient-to-br ${album.color} flex items-center justify-center`}>
                <span className="text-5xl">{album.emoji}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-pink-700">{album.title}</h3>
                <p className="text-sm text-gray-600">{album.description}</p>
                <div className="mt-2 text-xs text-gray-500">
                  📁 6+ foto & video
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={next}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity"
          >
            Lanjut ke Surat Cinta →
          </button>
        </div>
      </div>

      {/* Modal Album */}
      {selectedAlbum && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedAlbum(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{selectedAlbum.title}</h3>
                  <p className="text-sm opacity-90">{selectedAlbum.description}</p>
                </div>
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="text-white text-xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Main Photo */}
              <div className="mb-6">
                <div className={`aspect-video rounded-xl bg-gradient-to-br ${selectedAlbum.color} flex items-center justify-center mb-2`}>
                  <span className="text-5xl">{selectedAlbum.emoji}</span>
                </div>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {selectedAlbum.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 ${
                      photo.type === 'video' 
                        ? 'bg-gradient-to-br from-blue-100 to-cyan-100' 
                        : 'bg-gradient-to-br from-pink-100 to-purple-100'
                    }`}
                  >
                    <span className="text-2xl mb-1">{photo.emoji}</span>
                    <p className="text-xs text-center font-medium">{photo.title}</p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {photo.type === 'video' ? 'VIDEO' : 'FOTO'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                <p className="text-gray-700">
                  "Terima kasih untuk setiap momen indah bersamamu, {name}. 
                  Aku bersyukur atas setiap kenangan yang kita buat bersama." 💕
                </p>
                <p className="text-right text-pink-600 font-bold mt-2">
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

// SCENE 4: Love Letter
function LoveLetterScene({ name, next }) {
  const [step, setStep] = useState(0);
  
  const messages = [
    `Dan di hari ulang tahunmu ini, ${name || "sayang"}, aku ingin mengucapkan terima kasih.`,
    "Terima kasih telah menjadi manusia yang begitu menginspirasi.",
    "Terima kasih untuk setiap tawa, setiap dukungan, dan setiap cara unikmu membuat hidupku lebih berwarna.",
    "Aku tidak bisa menunggu untuk mengisi lebih banyak halaman album kita dengan petualangan baru,",
    "impian yang kita kejar bersama, dan momen-momen sederhana yang terasa berarti karena kita lakukan bersama."
  ];

  useEffect(() => {
    if (step < messages.length) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const canContinue = step >= messages.length;

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-100 flex items-center justify-center p-4"
      onClick={canContinue ? next : undefined}
    >
      <div className="max-w-2xl w-full bg-white rounded-2xl p-6 shadow-lg border border-pink-200">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">❤️</span>
          </div>
          <h3 className="text-xl font-bold text-pink-700">💌 Surat Untukmu</h3>
          <p className="text-gray-600 text-sm">Dari Mas Bagus, dengan cinta</p>
        </div>

        <div className="space-y-4 min-h-[200px]">
          {messages.slice(0, step).map((message, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {message}
            </p>
          ))}
          
          {step < messages.length && (
            <div className="flex justify-center">
              <span className="animate-pulse text-pink-400">●</span>
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
          <p className="text-sm text-gray-500">
            {canContinue ? "✨ Sentuh layar untuk kejutan terakhir..." : "✨ Membaca pesan..."}
          </p>
        </div>
      </div>
    </div>
  );
}

// SCENE 5: Final Scene
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
    if (step < wishes.length) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-pink-600 mb-2">
            Selamat ulang tahun, {name || "sayang"}! 💝
          </h2>
          <p className="text-gray-700">Ini adalah hari untuk merayakan kamu</p>
        </div>

        <div className="w-48 h-48 mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 mb-6">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <span className="text-5xl">💑</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="space-y-3">
            {wishes.slice(0, step).map((wish, index) => (
              <p key={index} className="text-gray-700">
                ✨ {wish}
              </p>
            ))}
            
            {step < wishes.length && (
              <div className="flex justify-center">
                <span className="animate-pulse text-pink-400">●</span>
              </div>
            )}
          </div>
        </div>

        {step >= wishes.length && (
          <div className="text-center mb-6">
            <p className="text-xl font-bold text-pink-600 mb-2">
              I love you dede cantiiikkk 💕
            </p>
            <p className="text-gray-600">Kamu adalah anugerah terindah</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity">
            🎵 Putar Pesan Suara
          </button>
          
          <button className="border-2 border-pink-400 text-pink-600 p-3 rounded-xl font-bold hover:bg-pink-50 transition-colors">
            🎁 Lihat Hadiah
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Made with 💖 by Mas Bagus
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
