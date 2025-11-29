import React from 'react';

// --- Data Definition ---

const TOPS_DATA = [
  { size: 'XXS', num: '32', kr: '33', bust: '74-78', waist: '58-62', hips: '79-83' },
  { size: 'XS', num: '34', kr: '44', bust: '78-82', waist: '62-66', hips: '83-87' },
  { size: 'S', num: '36 ~ 38', kr: '55', bust: '82-90', waist: '66-74', hips: '87-94.5' },
  { size: 'M', num: '40 ~ 42', kr: '66', bust: '90-98', waist: '74-82.5', hips: '94.5-100.5' },
  { size: 'L', num: '44 ~ 46', kr: '77', bust: '98-107', waist: '82.5-93', hips: '100.5-107.5' },
  { size: 'XL', num: '48 ~ 50', kr: '88', bust: '107-119', waist: '93-105', hips: '107.5-117.5' },
  { size: 'XXL', num: '52 ~ 54', kr: '99', bust: '119-131', waist: '105-117.5', hips: '117.5-128' },
];

const BOTTOMS_DATA = [
  { size: 'XXS', num: '32', kr: '33', waist: '58-62', hips: '79-83' },
  { size: 'XS', num: '34', kr: '44', waist: '62-66', hips: '83-87' },
  { size: 'S', num: '36 ~ 38', kr: '55', waist: '66-74', hips: '87-94.5' },
  { size: 'M', num: '40 ~ 42', kr: '66', waist: '74-82.5', hips: '94.5-100.5' },
  { size: 'L', num: '44 ~ 46', kr: '77', waist: '82.5-93', hips: '100.5-107.5' },
  { size: 'XL', num: '48 ~ 50', kr: '88', waist: '93-105', hips: '107.5-117.5' },
  { size: 'XXL', num: '52 ~ 54', kr: '99', waist: '105-117.5', hips: '117.5-128' },
];

const SHOES_DATA = [
  { eu1: '34', kr1: '220', eu2: '35', kr2: '225' },
  { eu1: '36', kr1: '230', eu2: '37', kr2: '235' },
  { eu1: '38', kr1: '240', eu2: '39', kr2: '245' },
  { eu1: '40', kr1: '250', eu2: '41', kr2: '255' },
  { eu1: '42', kr1: '260', eu2: '-', kr2: '-' },
];

export function SizeGuide() {
  return (
    <div className="w-full flex justify-center p-4 md:p-8 font-sans">
      {/* Font Injection for NanumSquare Neo */}
      <style>
        {`
          @import url('https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css');
          .font-nanum {
            font-family: 'NanumSquare Neo', 'NanumSquare', sans-serif;
          }
        `}
      </style>

      <div className="w-full max-w-[860px] bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10 font-nanum text-[#333]">
        {/* Header Section */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            H&M 여성 사이즈 가이드
          </h1>
          <p className="text-base md:text-lg font-bold text-slate-700">
            (단위 : CM, 신체 사이즈 기준)
          </p>
          
          <div className="pt-4 text-sm md:text-base text-blue-500 font-medium leading-relaxed">
            <p>브랜드 판매처에서 제공하는 사이즈 가이드 입니다.</p>
            <p>상품의 정확한 실측 치수가 아니기에 참고용으로 활용 부탁드립니다.</p>
          </div>
        </div>

        {/* Table 1: Tops */}
        <div className="mb-12 border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-[#EEE] py-4 px-5 text-center font-bold text-slate-700 text-base md:text-lg">
            탑 / 블라우스 / 원피스
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-sm md:text-base text-slate-700">
                  <th className="py-4 px-3 font-medium border-r border-slate-100">사이즈</th>
                  <th className="py-4 px-3 font-medium border-r border-slate-100">사이즈</th>
                  <th className="py-4 px-3 font-medium border-r border-slate-100">한국</th>
                  <th className="py-4 px-3 font-medium border-r border-slate-100">가슴둘레</th>
                  <th className="py-4 px-3 font-medium border-r border-slate-100">허리둘레</th>
                  <th className="py-4 px-3 font-medium">엉덩이</th>
                </tr>
              </thead>
              <tbody>
                {TOPS_DATA.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 text-sm md:text-base text-slate-600">
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.size}</td>
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.num}</td>
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.kr}</td>
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.bust}</td>
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.waist}</td>
                    <td className="py-3.5 px-3">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Bottoms */}
        <div className="mb-12 border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-[#EEE] py-4 px-5 text-center font-bold text-slate-700 text-base md:text-lg">
            스커트 / 바지
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-sm md:text-base text-slate-700">
                  <th className="py-4 px-3 font-medium border-r border-slate-100">사이즈</th>
                  <th className="py-4 px-3 font-medium border-r border-slate-100">사이즈</th>
                  <th className="py-4 px-3 font-medium border-r border-slate-100">한국</th>
                  <th className="py-4 px-3 font-medium border-r border-slate-100">허리둘레</th>
                  <th className="py-4 px-3 font-medium border-r border-slate-100">엉덩이</th>
                  <th className="py-4 px-3 font-medium">-</th>
                </tr>
              </thead>
              <tbody>
                {BOTTOMS_DATA.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 text-sm md:text-base text-slate-600">
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.size}</td>
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.num}</td>
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.kr}</td>
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.waist}</td>
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.hips}</td>
                    <td className="py-3.5 px-3">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 3: Shoes */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-[#EEE] py-4 px-5 text-center font-bold text-slate-700 text-base md:text-lg">
            여성 신발
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[350px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-sm md:text-base text-slate-700">
                  <th className="py-4 px-3 font-medium border-r border-slate-100 w-1/4">사이즈</th>
                  <th className="py-4 px-3 font-medium border-r border-slate-100 w-1/4">한국</th>
                  <th className="py-4 px-3 font-medium border-r border-slate-100 w-1/4">사이즈</th>
                  <th className="py-4 px-3 font-medium w-1/4">한국</th>
                </tr>
              </thead>
              <tbody>
                {SHOES_DATA.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 text-sm md:text-base text-slate-600">
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.eu1}</td>
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.kr1}</td>
                    <td className="py-3.5 px-3 border-r border-slate-100">{row.eu2}</td>
                    <td className="py-3.5 px-3">{row.kr2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
