// SCENE 3: Gallery Scene - DIPERBAIKI dengan fitur galeri ekspansi
function GalleryScene({ couplePhotos, herPhotos, name, onNext }) {
  const [activeTab, setActiveTab] = useState("couple");
  const [expandedGallery, setExpandedGallery] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Data media lengkap (foto dan video)
  const galleryMedia = {
    couple: {
      title: "Kenangan Kita Berdua",
      description: "Momen-momen indah yang kita lewati bersama",
      items: [
        {
          type: "photo",
          content: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&auto=format&fit=crop",
          title: "Pertemuan Pertama",
          date: "14 Februari 2023",
          description: "Hari pertama kita bertemu, takkan pernah kulupa"
        },
        {
          type: "photo",
          content: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f47?w=800&auto=format&fit=crop",
          title: "Liburan Pertama",
          date: "Juli 2023",
          description: "Liburan pertama kita ke pantai bersama"
        },
        {
          type: "photo",
          content: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f48?w=800&auto=format&fit=crop",
          title: "Ulang Tahun Pertama",
          date: "14 Februari 2024",
          description: "Merayakan ulang tahun pertamamu bersamaku"
        },
        {
          type: "video",
          content: "https://assets.mixkit.co/videos/preview/mixkit-couple-having-fun-on-a-swing-41539-large.mp4",
          title: "Bersantai di Taman",
          date: "Mei 2023",
          description: "Hari yang cerah bermain ayunan bersama"
        },
        {
          type: "photo",
          content: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop",
          title: "Makan Malam Romantis",
          date: "Agustus 2023",
          description: "Makan malam spesial di restoran favoritmu"
        },
        {
          type: "video",
          content: "https://assets.mixkit.co/videos/preview/mixkit-happy-couple-celebrating-a-birthday-41455-large.mp4",
          title: "Pesta Kejutan",
          date: "Desember 2023",
          description: "Kejutan ulang tahun yang tak terlupakan"
        }
      ]
    },
    her: {
      title: "Bintang Utama",
      description: "Kecantikanmu yang selalu memukau",
      items: [
        {
          type: "photo",
          content: "https://images.unsplash.com/photo-1494790108755-2616c113b1db?w=800&auto=format&fit=crop",
          title: "Senyuman Indahmu",
          date: "Januari 2023",
          description: "Senyumanmu yang selalu membuat hariku cerah"
        },
        {
          type: "photo",
          content: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop",
          title: "Momen Spontan",
          date: "Maret 2023",
          description: "Ketika kamu sedang asyik membaca buku"
        },
        {
          type: "video",
          content: "https://assets.mixkit.co/videos/preview/mixkit-girl-smiling-and-looking-at-something-out-of-the-shot-41530-large.mp4",
          title: "Bahagia Bersama",
          date: "Juni 2023",
          description: "Melihatmu tertawa adalah kebahagiaan terbesarku"
        },
        {
          type: "photo",
          content: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop",
          title: "Senja Bersamamu",
          date: "September 2023",
          description: "Menikmati senja dengan orang tercinta"
        },
        {
          type: "video",
          content: "https://assets.mixkit.co/videos/preview/mixkit-woman-blowing-birthday-candles-41537-large.mp4",
          title: "Meniup Lilin",
          date: "Februari 2024",
          description: "Momen spesial meniup lilin ulang tahun"
        },
        {
          type: "photo",
          content: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop",
          title: "Foto Terbaru",
          date: "Januari 2024",
          description: "Kecantikanmu yang semakin hari semakin mempesona"
        }
      ]
    }
  };

  const handlePhotoClick = (tab, index) => {
    setExpandedGallery({ tab, index });
    setCurrentMediaIndex(index);
  };

  const closeExpandedGallery = () => {
    setExpandedGallery(null);
  };

  const nextMedia = (e) => {
    e.stopPropagation();
    const items = galleryMedia[expandedGallery.tab].items;
    setCurrentMediaIndex((prev) => (prev + 1) % items.length);
  };

  const prevMedia = (e) => {
    e.stopPropagation();
    const items = galleryMedia[expandedGallery.tab].items;
    setCurrentMediaIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="h-full relative">
      {!expandedGallery ? (
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
            <p className="text-gray-600 mt-2">Klik foto untuk melihat kenangan lengkap + video</p>
          </div>

          <div className="flex justify-center gap-4 mt-6 px-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab("couple");
              }}
              className={`px-6 py-2 rounded-full transition-all ${activeTab === "couple" 
                ? 'bg-pink-500 text-white shadow-lg' 
                : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
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
                : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
            >
              ⭐ {name || "Dede"} Cantik
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-gray-800">
                {galleryMedia[activeTab].title}
              </h3>
              <p className="text-gray-600">{galleryMedia[activeTab].description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryMedia[activeTab].items.slice(0, 3).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white cursor-pointer hover:scale-105 transition-transform duration-300 relative group"
                  onClick={() => handlePhotoClick(activeTab, index)}
                >
                  <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex flex-col items-center justify-center p-4">
                    <div className="text-4xl mb-2">
                      {item.type === "video" ? "🎥" : "📸"}
                    </div>
                    <p className="text-sm font-semibold text-gray-800 text-center">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600 text-center mt-1">
                      {item.date}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Klik untuk lihat semua
                    </div>
                  </div>
                  {item.type === "video" && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      VIDEO
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Klik salah satu foto di atas untuk melihat semua foto + video
                <Sparkles className="w-4 h-4" />
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {galleryMedia[activeTab].items.slice(3).map((item, index) => (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 3) * 0.1 }}
                  className="aspect-video rounded-xl overflow-hidden shadow-md border-2 border-white cursor-pointer hover:scale-105 transition-transform duration-300 relative"
                  onClick={() => handlePhotoClick(activeTab, index + 3)}
                >
                  <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center">
                    <span className="text-2xl">
                      {item.type === "video" ? "🎬" : "🖼️"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-xs font-medium truncate">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-6 text-center border-t border-pink-200">
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Lanjutkan Ke Surat Cinta 💌
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full bg-black/95 backdrop-blur-md relative"
        >
          <button
            onClick={closeExpandedGallery}
            className="absolute top-4 left-4 z-50 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
          >
            ← Kembali
          </button>

          <div className="h-full flex flex-col md:flex-row">
            {/* Main Media Display */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
              <button
                onClick={prevMedia}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all z-10"
              >
                ←
              </button>

              <div className="max-w-4xl w-full max-h-[70vh] overflow-hidden rounded-2xl shadow-2xl">
                {galleryMedia[expandedGallery.tab].items[currentMediaIndex].type === "video" ? (
                  <div className="relative">
                    <video
                      key={galleryMedia[expandedGallery.tab].items[currentMediaIndex].content}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                    >
                      <source src={galleryMedia[expandedGallery.tab].items[currentMediaIndex].content} type="video/mp4" />
                      Browser Anda tidak mendukung video tag.
                    </video>
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      🎥 VIDEO
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-full h-[70vh] bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="text-8xl mb-4">📸</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {galleryMedia[expandedGallery.tab].items[currentMediaIndex].title}
                        </h3>
                        <p className="text-gray-600">
                          {galleryMedia[expandedGallery.tab].items[currentMediaIndex].description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      📷 FOTO
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={nextMedia}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all z-10"
              >
                →
              </button>

              {/* Media Info */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md text-white p-4 rounded-2xl min-w-[300px] text-center">
                <h3 className="text-xl font-bold">
                  {galleryMedia[expandedGallery.tab].items[currentMediaIndex].title}
                </h3>
                <p className="text-sm opacity-90">
                  {galleryMedia[expandedGallery.tab].items[currentMediaIndex].date}
                </p>
                <p className="text-sm mt-2">
                  {galleryMedia[expandedGallery.tab].items[currentMediaIndex].description}
                </p>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="w-full md:w-1/4 bg-black/70 p-4 overflow-y-auto">
              <h3 className="text-white font-bold text-lg mb-4">
                Semua Media ({galleryMedia[expandedGallery.tab].items.length})
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {galleryMedia[expandedGallery.tab].items.map((item, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${currentMediaIndex === index ? 'ring-4 ring-pink-500 scale-105' : 'opacity-70 hover:opacity-100'}`}
                    onClick={() => setCurrentMediaIndex(index)}
                  >
                    <div className={`w-full h-full flex items-center justify-center ${currentMediaIndex === index ? 'bg-gradient-to-br from-pink-400 to-rose-400' : 'bg-gradient-to-br from-gray-700 to-gray-900'}`}>
                      <span className="text-2xl">
                        {item.type === "video" ? "🎬" : "📷"}
                      </span>
                    </div>
                    <div className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Media Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentMediaIndex + 1} / {galleryMedia[expandedGallery.tab].items.length}
          </div>
        </motion.div>
      )}
    </div>
  );
}
