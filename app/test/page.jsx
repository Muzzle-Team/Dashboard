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
  const [selectedItem, setSelectedItem] = useState('image');

  const [imagePos, setImagePos] = useState({ x: 200, y: 75 });
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
  const [imageRadius, setImageRadius] = useState(50);

  const [textPos, setTextPos] = useState({ x: 200, y: 185 });
  const [textSize, setTextSize] = useState({ fontSize: 24 });
  const [textColor, setTextColor] = useState('#ffffff');
  const username = 'username';

  const [welcomePos, setWelcomePos] = useState({ x: 150, y: 30 });
  const [welcomeSize, setWelcomeSize] = useState({ fontSize: 32 });
  const [welcomeColor, setWelcomeColor] = useState('#ffffff');
  const [welcomeText, setWelcomeText] = useState('Welcome to server');

  const [bgUrl, setBgUrl] = useState('');
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 300 });

  useEffect(() => {
    const img = new window.Image();
    img.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
    img.crossOrigin = 'Anonymous';
    img.onload = () => setImageObj(img);
  }, []);

  useEffect(() => {
    if (bgImage) {
      const maxWidth = 800;
      const maxHeight = 500;
      let newWidth = bgImage.width;
      let newHeight = bgImage.height;
      
      if (newWidth > maxWidth || newHeight > maxHeight) {
        const ratio = Math.min(maxWidth / newWidth, maxHeight / newHeight);
        newWidth = newWidth * ratio;
        newHeight = newHeight * ratio;
      }
      
      setCanvasSize({ width: newWidth, height: newHeight });
      
      const centerX = newWidth / 2;
      const centerY = newHeight / 2;
      
      setWelcomePos({ x: Math.max(0, centerX - 100), y: Math.max(0, centerY * 0.2) });
      setImagePos({ x: Math.max(0, centerX - imageSize.width / 2), y: Math.max(0, centerY - imageSize.height / 2) });
      setTextPos({ x: Math.max(0, centerX - 50), y: Math.max(0, centerY + imageSize.height / 2 + 10) });
    } else {
      setCanvasSize({ width: 500, height: 300 });
    }
  }, [bgImage]);

  useEffect(() => {
    if (imageTrRef.current) imageTrRef.current.nodes([]);
    if (textTrRef.current) textTrRef.current.nodes([]);
    if (welcomeTrRef.current) welcomeTrRef.current.nodes([]);

    if (selectedItem === 'image' && imageRef.current && imageTrRef.current) {
      imageTrRef.current.nodes([imageRef.current]);
      imageTrRef.current.getLayer().batchDraw();
    } else if (selectedItem === 'username' && textRef.current && textTrRef.current) {
      textTrRef.current.nodes([textRef.current]);
      textTrRef.current.getLayer().batchDraw();
    } else if (selectedItem === 'welcome' && welcomeRef.current && welcomeTrRef.current) {
      welcomeTrRef.current.nodes([welcomeRef.current]);
      welcomeTrRef.current.getLayer().batchDraw();
    }
  }, [selectedItem]);

  const handleSend = () => {
    console.log('Background:', bgImage ? { width: canvasSize.width, height: canvasSize.height, url: bgUrl } : 'No background');
    console.log('Image:', { ...imagePos, ...imageSize, imageRadius });
    console.log('Text:', { ...textPos, ...textSize, color: textColor });
    console.log('Welcome:', { ...welcomePos, ...welcomeSize, color: welcomeColor, text: welcomeText });
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
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 shadow-2xl">
            <div className="flex justify-center overflow-auto max-h-[600px]">
              <Stage
                width={canvasSize.width}
                height={canvasSize.height}
                className="rounded-lg shadow-xl"
                style={{ background: bgImage ? 'transparent' : '#1e293b' }}
                ref={stageRef}
              >
                <Layer>
                  {bgImage && (
                    <Rect
                      width={canvasSize.width}
                      height={canvasSize.height}
                      fillPatternImage={bgImage}
                      fillPatternScaleX={canvasSize.width / bgImage.width}
                      fillPatternScaleY={canvasSize.height / bgImage.height}
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
                        onClick={() => setSelectedItem('image')}
                        onTap={() => setSelectedItem('image')}
                        onDragEnd={(e) => {
                          const node = e.target;
                          const newX = Math.max(0, Math.min(node.x(), canvasSize.width - imageSize.width));
                          const newY = Math.max(0, Math.min(node.y(), canvasSize.height - imageSize.height));
                          node.x(newX);
                          node.y(newY);
                          setImagePos({ x: newX, y: newY });
                        }}
                        dragBoundFunc={(pos) => {
                          return {
                            x: Math.max(0, Math.min(pos.x, canvasSize.width - imageSize.width)),
                            y: Math.max(0, Math.min(pos.y, canvasSize.height - imageSize.height))
                          };
                        }}
                        onTransformEnd={(e) => {
                          const node = imageRef.current;
                          const newWidth = Math.max(20, node.width() * node.scaleX());
                          const newHeight = Math.max(20, node.height() * node.scaleY());
                          
                          const scaleRatio = newWidth / imageSize.width;
                          setImageRadius(imageRadius * scaleRatio);
                          
                          setImageSize({ width: newWidth, height: newHeight });
                          node.scaleX(1);
                          node.scaleY(1);
                        }}
                      />
                      <Transformer 
                        ref={imageTrRef} 
                        rotateEnabled={false} 
                        keepRatio={true} 
                        boundBoxFunc={(oldBox, newBox) => {
                          if (newBox.width < 20 || newBox.height < 20) return oldBox;
                          if (newBox.x < 0 || newBox.y < 0 || 
                              newBox.x + newBox.width > canvasSize.width || 
                              newBox.y + newBox.height > canvasSize.height) return oldBox;
                          return newBox;
                        }} 
                      />
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
                      onClick={() => setSelectedItem('username')}
                      onTap={() => setSelectedItem('username')}
                      onDragEnd={(e) => {
                        const node = e.target;
                        const newX = Math.max(0, Math.min(node.x(), canvasSize.width - node.width()));
                        const newY = Math.max(0, Math.min(node.y(), canvasSize.height - node.height()));
                        node.x(newX);
                        node.y(newY);
                        setTextPos({ x: newX, y: newY });
                      }}
                      dragBoundFunc={(pos) => {
                        const node = textRef.current;
                        return {
                          x: Math.max(0, Math.min(pos.x, canvasSize.width - node.width())),
                          y: Math.max(0, Math.min(pos.y, canvasSize.height - node.height()))
                        };
                      }}
                      onTransformEnd={(e) => {
                        const node = textRef.current;
                        setTextSize({ fontSize: Math.max(10, node.fontSize() * node.scaleX()) });
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
                      onClick={() => setSelectedItem('welcome')}
                      onTap={() => setSelectedItem('welcome')}
                      onDragEnd={(e) => {
                        const node = e.target;
                        const newX = Math.max(0, Math.min(node.x(), canvasSize.width - node.width()));
                        const newY = Math.max(0, Math.min(node.y(), canvasSize.height - node.height()));
                        node.x(newX);
                        node.y(newY);
                        setWelcomePos({ x: newX, y: newY });
                      }}
                      dragBoundFunc={(pos) => {
                        const node = welcomeRef.current;
                        return {
                          x: Math.max(0, Math.min(pos.x, canvasSize.width - node.width())),
                          y: Math.max(0, Math.min(pos.y, canvasSize.height - node.height()))
                        };
                      }}
                      onTransformEnd={(e) => {
                        const node = welcomeRef.current;
                        setWelcomeSize({ fontSize: Math.max(10, node.fontSize() * node.scaleX()) });
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

          <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-slate-700">
              <button onClick={() => setActiveTab('image')} className={`flex-1 py-4 px-2 text-sm font-semibold transition-colors ${activeTab === 'image' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>الصورة</button>
              <button onClick={() => setActiveTab('username')} className={`flex-1 py-4 px-2 text-sm font-semibold transition-colors ${activeTab === 'username' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>الاسم</button>
              <button onClick={() => setActiveTab('welcome')} className={`flex-1 py-4 px-2 text-sm font-semibold transition-colors ${activeTab === 'welcome' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>الترحيب</button>
              <button onClick={() => setActiveTab('background')} className={`flex-1 py-4 px-2 text-sm font-semibold transition-colors ${activeTab === 'background' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>الخلفية</button>
            </div>

            <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
              {activeTab === 'image' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">تحكم الصورة</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">X Position</label>
                    <div className="flex gap-2">
                      <button onClick={() => setImagePos({ ...imagePos, x: Math.max(0, imagePos.x - 1) })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">←</button>
                      <input type="number" value={Math.round(imagePos.x)} onChange={(e) => setImagePos({ ...imagePos, x: Math.max(0, Math.min(Number(e.target.value), canvasSize.width - imageSize.width)) })} className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <button onClick={() => setImagePos({ ...imagePos, x: Math.min(canvasSize.width - imageSize.width, imagePos.x + 1) })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">→</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Y Position</label>
                    <div className="flex gap-2">
                      <button onClick={() => setImagePos({ ...imagePos, y: Math.max(0, imagePos.y - 1) })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">↑</button>
                      <input type="number" value={Math.round(imagePos.y)} onChange={(e) => setImagePos({ ...imagePos, y: Math.max(0, Math.min(Number(e.target.value), canvasSize.height - imageSize.height)) })} className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <button onClick={() => setImagePos({ ...imagePos, y: Math.min(canvasSize.height - imageSize.height, imagePos.y + 1) })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">↓</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">العرض (Width)</label>
                    <input type="number" value={Math.round(imageSize.width)} onChange={(e) => { const w = Math.max(20, Number(e.target.value)); setImageSize({ width: w, height: w }); setImageRadius(w / 2); }} className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">الطول (Height)</label>
                    <input type="number" value={Math.round(imageSize.height)} onChange={(e) => { const h = Math.max(20, Number(e.target.value)); setImageSize({ width: h, height: h }); setImageRadius(h / 2); }} className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">استدارة الزوايا: {Math.round(imageRadius)}</label>
                    <input type="range" min="0" max={Math.min(imageSize.width, imageSize.height) / 2} value={imageRadius} onChange={(e) => setImageRadius(Number(e.target.value))} className="w-full" />
                  </div>
                </div>
              )}

              {activeTab === 'username' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">تحكم اسم المستخدم</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">X Position</label>
                    <div className="flex gap-2">
                      <button onClick={() => setTextPos({ ...textPos, x: Math.max(0, textPos.x - 1) })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">←</button>
                      <input type="number" value={Math.round(textPos.x)} onChange={(e) => setTextPos({ ...textPos, x: Number(e.target.value) })} className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <button onClick={() => setTextPos({ ...textPos, x: textPos.x + 1 })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">→</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Y Position</label>
                    <div className="flex gap-2">
                      <button onClick={() => setTextPos({ ...textPos, y: Math.max(0, textPos.y - 1) })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">↑</button>
                      <input type="number" value={Math.round(textPos.y)} onChange={(e) => setTextPos({ ...textPos, y: Number(e.target.value) })} className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <button onClick={() => setTextPos({ ...textPos, y: textPos.y + 1 })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">↓</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">حجم الخط</label>
                    <input type="number" value={textSize.fontSize} onChange={(e) => setTextSize({ fontSize: Number(e.target.value) })} className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">اللون</label>
                    <div className="flex gap-2">
                      <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-12 w-20 rounded-lg cursor-pointer" />
                      <input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'welcome' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">تحكم رسالة الترحيب</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">النص</label>
                    <input type="text" value={welcomeText} onChange={(e) => setWelcomeText(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">X Position</label>
                    <div className="flex gap-2">
                      <button onClick={() => setWelcomePos({ ...welcomePos, x: Math.max(0, welcomePos.x - 1) })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">←</button>
                      <input type="number" value={Math.round(welcomePos.x)} onChange={(e) => setWelcomePos({ ...welcomePos, x: Number(e.target.value) })} className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <button onClick={() => setWelcomePos({ ...welcomePos, x: welcomePos.x + 1 })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">→</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Y Position</label>
                    <div className="flex gap-2">
                      <button onClick={() => setWelcomePos({ ...welcomePos, y: Math.max(0, welcomePos.y - 1) })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">↑</button>
                      <input type="number" value={Math.round(welcomePos.y)} onChange={(e) => setWelcomePos({ ...welcomePos, y: Number(e.target.value) })} className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <button onClick={() => setWelcomePos({ ...welcomePos, y: welcomePos.y + 1 })} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">↓</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">حجم الخط</label>
                    <input type="number" value={welcomeSize.fontSize} onChange={(e) => setWelcomeSize({ fontSize: Number(e.target.value) })} className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">اللون</label>
                    <div className="flex gap-2">
                      <input type="color" value={welcomeColor} onChange={(e) => setWelcomeColor(e.target.value)} className="h-12 w-20 rounded-lg cursor-pointer" />
                      <input type="text" value={welcomeColor} onChange={(e) => setWelcomeColor(e.target.value)} className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'background' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">تحكم الخلفية</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">رابط الصورة</label>
                    <input type="text" placeholder="https://example.com/image.jpg" value={bgUrl} onChange={(e) => setBgUrl(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <button onClick={loadBackground} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">تحميل الخلفية</button>

                  {bgImage && (
                    <button onClick={() => { setBgImage(null); setBgUrl(''); }} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">إزالة الخلفية</button>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-700">
              <button onClick={handleSend} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg">إرسال الإعدادات</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}