import React, { useState } from 'react';
import { Calculator, Save, Trash2, ArrowRight, Heart, RotateCcw } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState('multiply'); // เพิ่มสเตต (State) สำหรับจัดการโหมด
  const [mainValue, setMainValue] = useState(''); // ใช้แทน amount เดิม เพื่อรองรับทั้ง 2 โหมด
  const [rate, setRate] = useState('');
  const [title, setTitle] = useState('');
  const [favorites, setFavorites] = useState([]);

  // คำนวณ (Calculation) แยกตามโหมด
  let displayResult = 0;
  let displayAmount = 0;

  const numMain = parseFloat(mainValue || 0);
  const numRate = parseFloat(rate || 0);

  if (mode === 'multiply') {
    displayAmount = numMain;
    displayResult = numMain * numRate;
  } else {
    displayResult = numMain;
    displayAmount = numRate !== 0 ? numMain / numRate : 0;
  }

  const toggleMode = (newMode) => {
    if (mode === newMode) return;
    // สลับโหมดโดยนำค่าที่คำนวณได้ไปตั้งเป็นค่าต้นทางของอีกโหมด เพื่อความต่อเนื่อง
    if (mode === 'multiply') {
      setMainValue(displayResult > 0 ? displayResult.toString() : '');
    } else {
      setMainValue(displayAmount > 0 ? displayAmount.toString() : '');
    }
    setMode(newMode);
  };

  const handleSave = () => {
    if (!mainValue || !rate) return;
    
    const newFavorite = {
      id: Date.now(),
      title: title.trim() || 'รายการที่บันทึก (Saved Item)',
      amount: displayAmount,
      rate: numRate,
      result: displayResult
    };
    
    setFavorites([newFavorite, ...favorites]);
    setTitle(''); // เคลียร์ชื่อหลังบันทึก
  };

  const handleDelete = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const handleLoadFavorite = (fav) => {
    setMode('multiply'); // นำค่ามาใช้ในโหมดหาผลลัพธ์เสมอเพื่อให้เข้าใจง่าย
    setMainValue(fav.amount.toString());
    setRate(fav.rate.toString());
  };

  const handleReset = () => {
    setMainValue('');
    setRate('');
    setTitle('');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* ส่วนหัว (Header) */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-full mb-4 text-white shadow-lg">
            <Calculator size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">เครื่องคำนวณเรทราคา (Rate Calculator)</h1>
          <p className="text-slate-500 mt-2">คำนวณ บันทึก และจัดการเรทราคาที่คุณชื่นชอบ</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* ส่วนเครื่องคิดเลข (Calculator Section) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calculator size={20} className="text-blue-600"/> 
              การคำนวณ (Calculation)
            </h2>
            
            {/* สวิตช์เลือกโหมดการคำนวณ */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button
                onClick={() => toggleMode('multiply')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${mode === 'multiply' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                หาราคา (Find Result)
              </button>
              <button
                onClick={() => toggleMode('divide')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${mode === 'divide' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                หาจำนวนต้น (Find Base)
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {mode === 'multiply' ? 'จำนวนต้น (Base Amount)' : 'ราคาที่ต้องการ (Target Result)'}
                </label>
                <input
                  type="number"
                  value={mainValue}
                  onChange={(e) => setMainValue(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder={mode === 'multiply' ? 'เช่น 1000' : 'เช่น 35000'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  เรทตัวคูณ (Rate Multiplier)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="เช่น 0.03 หรือ 35"
                />
              </div>

              {/* แสดงผลลัพธ์ (Result Display) */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
                <div className="text-sm text-blue-600 font-medium mb-1">
                  {mode === 'multiply' ? 'ราคา (Result)' : 'จำนวนต้นที่ต้องใช้ (Required Base Amount)'}
                </div>
                <div className="text-3xl font-bold text-blue-900 break-words">
                  {mode === 'multiply'
                    ? displayResult.toLocaleString('th-TH', { maximumFractionDigits: 4 })
                    : displayAmount.toLocaleString('th-TH', { maximumFractionDigits: 4 })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  ชื่อรายการบันทึก (Save Title) - เลือกใส่หรือไม่ก็ได้
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all mb-3"
                  placeholder="เช่น ค่าแรง, เรทเงินเยน, ส่วนลด 20%"
                />
                
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={!mainValue || !rate}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
                  >
                    <Save size={18} />
                    บันทึกเรทนี้ (Save Rate)
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                    title="ล้างค่า (Reset)"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ส่วนรายการโปรด (Favorites Section) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Heart size={20} className="text-rose-500"/> 
              เรทที่ชอบ (Favorite Rates)
              <span className="ml-auto bg-slate-100 text-slate-600 py-1 px-3 rounded-full text-sm font-medium">
                {favorites.length}
              </span>
            </h2>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                  <Heart size={48} className="mb-4 opacity-20" />
                  <p>ยังไม่มีรายการที่บันทึกไว้</p>
                  <p className="text-sm">(No saved items yet)</p>
                </div>
              ) : (
                favorites.map((fav) => (
                  <div 
                    key={fav.id} 
                    className="group border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all bg-slate-50/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-800">{fav.title}</h3>
                      <button
                        onClick={() => handleDelete(fav.id)}
                        className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                        title="ลบ (Delete)"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-600 gap-2 mb-3 bg-white p-2 rounded-lg border border-slate-100">
                      <span>{fav.amount.toLocaleString()}</span>
                      <ArrowRight size={14} className="text-slate-400"/>
                      <span className="font-medium text-blue-600 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded">
                        {fav.rate}
                      </span>
                      <ArrowRight size={14} className="text-slate-400"/>
                      <span className="font-bold text-slate-800">
                        {fav.result.toLocaleString('th-TH', { maximumFractionDigits: 4 })}
                      </span>
                    </div>

                    <button
                      onClick={() => handleLoadFavorite(fav)}
                      className="w-full text-center text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-2 rounded-lg transition-colors font-medium border border-transparent hover:border-blue-100"
                    >
                      นำค่าไปใช้ (Apply Values)
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
