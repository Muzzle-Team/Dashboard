'use client';

import { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Transformer, Rect } from 'react-konva';

export default function MovableResizable() {
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const welcomeRef = useRef(null);
  const imageTrRef = useRef(null);
  const textTrRef = useRef(null);
  const welcomeTrRef = useRef(null);

  const [imageObj, setImageObj] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [activeTab, setActiveTab] = useState('image');

  // الصورة الشخصية - في المنتصف
  const [imagePos, setImagePos] = useState({ x: 200, y: 75 });
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
  const [imageRadius, setImageRadius] = useState(50);

  // النص - تحت الصورة في المنتصف
  const [textPos, setTextPos] = useState({ x: 200, y: 185 });
  const [textSize, setTextSize] = useState({ fontSize: 24 });
  const [textColor, setTextColor] = useState('#ffffff');
  const username = 'username';

  // welcome message - في أعلى المنتصف
  const [welcomePos, setWelcomePos] = useState({ x: 250, y: 30 });
  const [welcomeSize, setWelcomeSize] = useState({ fontSize: 32 });
  const [welcomeColor, setWelcomeColor] = useState('#ffffff');
  const welcomeText = 'Welcome to server';

  const [bgUrl, setBgUrl] = useState('');

  // تحميل الصورة الشخصية
  useEffect(() => {
    const img = new window.Image();
    img.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
    img.crossOrigin = 'Anonymous';
    img.onload = () => setImageObj(img);
  }, []);

  // تحديث مواضع العناصر عند تغيير الخلفية
  useEffect(() => {
    if (bgImage) {
      const centerX = bgImage.width / 2;
      const centerY = bgImage.height / 2;
      
      // تحديث موضع رسالة الترحيب (أعلى المنتصف)
      setWelcomePos({ x: centerX - 100, y: centerY * 0.2 });
      
      // تحديث موضع الصورة (في المنتصف)
      setImagePos({ x: centerX - imageSize.width / 2, y: centerY - imageSize.height / 2 });
      
      // تحديث موضع النص (تحت الصورة)
      setTextPos({ x: centerX - 50, y: centerY + imageSize.height / 2 + 10 });
    }
  }, [bgImage]);

  // تحديث transformers دايمًا
  useEffect(() => {
    if (imageRef.current && imageTrRef.current) {
      imageTrRef.current.nodes([imageRef.current]);
    }
    if (textRef.current && textTrRef.current) {
      textTrRef.current.nodes([textRef.current]);
    }
    if (welcomeRef.current && welcomeTrRef.current) {
      welcomeTrRef.current.nodes([welcomeRef.current]);
    }
  });

  const handleSend = () => {
    console.log('Background:', bgImage ? { width: bgImage.width, height: bgImage.height, url: bgUrl } : 'No background');
    console.log('Image:', { ...imagePos, ...imageSize, imageRadius });
    console.log('Text:', { ...textPos, ...textSize, color: textColor });
    console.log('Welcome:', { ...welcomePos, ...welcomeSize, color: welcomeColor });
  };

  const loadBackground = () => {
    if (!bgUrl.trim()) {
      setBgImage(null);
      return;
    }
    const bg = new window.Image();
    bg.src = bgUrl;
    bg.crossOrigin = 'Anonymous';
    bg.onload = () => setBgImage(bg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">محرر الترحيب</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas Area */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 shadow-2xl">
            <div className="flex justify-center overflow-auto max-h-[600px]">
              <Stage
                width={bgImage ? bgImage.width : 500}
                height={bgImage ? bgImage.height : 300}
                className="rounded-lg shadow-xl"
                style={{ background: bgImage ? 'transparent' : '#1e293b' }}
                ref={stageRef}
              >
                <Layer>
                  {bgImage && (
                    <Rect
                      width={bgImage.width}
                      height={bgImage.height}
                      fillPatternImage={bgImage}
                    />
                  )}

                  {imageObj && (
                    <>
                      <KonvaImage
                        ref={imageRef}
                        image={imageObj}
                        x={imagePos.x}
                        y={imagePos.y}
                        width={imageSize.width}
                        height={imageSize.height}
                        cornerRadius={imageRadius}
                        draggable
                        onDragEnd={(e) => setImagePos({ x: e.target.x(), y: e.target.y() })}
                        onTransformEnd={(e) => {
                          const node = imageRef.current;
                          const newWidth = node.width() * node.scaleX();
                          const newHeight = node.height() * node.scaleY();
                          
                          // حساب نسبة التغيير وتطبيقها على الاستدارة
                          const scaleRatio = newWidth / imageSize.width;
                          setImageRadius(imageRadius * scaleRatio);
                          
                          setImageSize({
                            width: newWidth,
                            height: newHeight,
                          });
                          node.scaleX(1);
                          node.scaleY(1);
                        }}
                      />
                      <Transformer ref={imageTrRef} rotateEnabled={false} keepRatio={true} />
                    </>
                  )}

                  <>
                    <Text
                      ref={textRef}
                      x={textPos.x}
                      y={textPos.y}
                      text={username}
                      fontSize={textSize.fontSize}
                      fill={textColor}
                      draggable
                      onDragEnd={(e) => setTextPos({ x: e.target.x(), y: e.target.y() })}
                      onTransformEnd={(e) => {
                        const node = textRef.current;
                        setTextSize({ fontSize: node.fontSize() * node.scaleX() });
                        node.scaleX(1);
                        node.scaleY(1);
                      }}
                    />
                    <Transformer ref={textTrRef} enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']} rotateEnabled={false} keepRatio={true} />
                  </>

                  <>
                    <Text
                      ref={welcomeRef}
                      x={welcomePos.x}
                      y={welcomePos.y}
                      text={welcomeText}
                      fontSize={welcomeSize.fontSize}
                      fill={welcomeColor}
                      draggable
                      onDragEnd={(e) => setWelcomePos({ x: e.target.x(), y: e.target.y() })}
                      onTransformEnd={(e) => {
                        const node = welcomeRef.current;
                        setWelcomeSize({ fontSize: node.fontSize() * node.scaleX() });
                        node.scaleX(1);
                        node.scaleY(1);
                      }}
                    />
                    <Transformer ref={welcomeTrRef} enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']} rotateEnabled={false} keepRatio={true} />
                  </>
                </Layer>
              </Stage>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-700">
              <button
                onClick={() => setActiveTab('image')}
                className={`flex-1 py-4 px-4 font-semibold transition-colors ${
                  activeTab === 'image'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                الصورة
              </button>
              <button
                onClick={() => setActiveTab('username')}
                className={`flex-1 py-4 px-4 font-semibold transition-colors ${
                  activeTab === 'username'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                الاسم
              </button>
              <button
                onClick={() => setActiveTab('welcome')}
                className={`flex-1 py-4 px-4 font-semibold transition-colors ${
                  activeTab === 'welcome'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                الترحيب
              </button>
              <button
                onClick={() => setActiveTab('background')}
                className={`flex-1 py-4 px-4 font-semibold transition-colors ${
                  activeTab === 'background'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                الخلفية
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 space-y-6">
              {activeTab === 'image' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">تحكم الصورة</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">X Position</label>
                    <input
                      type="number"
                      value={Math.round(imagePos.x)}
                      onChange={(e) => setImagePos({ ...imagePos, x: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Y Position</label>
                    <input
                      type="number"
                      value={Math.round(imagePos.y)}
                      onChange={(e) => setImagePos({ ...imagePos, y: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      استدارة الزوايا: {imageRadius}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={Math.min(imageSize.width, imageSize.height) / 2}
                      value={imageRadius}
                      onChange={(e) => setImageRadius(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'username' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">تحكم اسم المستخدم</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">X Position</label>
                    <input
                      type="number"
                      value={Math.round(textPos.x)}
                      onChange={(e) => setTextPos({ ...textPos, x: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Y Position</label>
                    <input
                      type="number"
                      value={Math.round(textPos.y)}
                      onChange={(e) => setTextPos({ ...textPos, y: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">حجم الخط</label>
                    <input
                      type="number"
                      value={textSize.fontSize}
                      onChange={(e) => setTextSize({ fontSize: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">اللون</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="h-12 w-20 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'welcome' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">تحكم رسالة الترحيب</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">X Position</label>
                    <input
                      type="number"
                      value={Math.round(welcomePos.x)}
                      onChange={(e) => setWelcomePos({ ...welcomePos, x: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Y Position</label>
                    <input
                      type="number"
                      value={Math.round(welcomePos.y)}
                      onChange={(e) => setWelcomePos({ ...welcomePos, y: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">حجم الخط</label>
                    <input
                      type="number"
                      value={welcomeSize.fontSize}
                      onChange={(e) => setWelcomeSize({ fontSize: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">اللون</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={welcomeColor}
                        onChange={(e) => setWelcomeColor(e.target.value)}
                        className="h-12 w-20 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={welcomeColor}
                        onChange={(e) => setWelcomeColor(e.target.value)}
                        className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'background' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">تحكم الخلفية</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">رابط الصورة</label>
                    <input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={bgUrl}
                      onChange={(e) => setBgUrl(e.target.value)}
                      className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    onClick={loadBackground}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    تحميل الخلفية
                  </button>

                  {bgImage && (
                    <button
                      onClick={() => {
                        setBgImage(null);
                        setBgUrl('');
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      إزالة الخلفية
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Send Button */}
            <div className="p-6 border-t border-slate-700">
              <button
                onClick={handleSend}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg"
              >
                إرسال الإعدادات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}