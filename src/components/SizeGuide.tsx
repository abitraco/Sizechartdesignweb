import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// --- Data Definition ---

const WOMEN_TOPS = [
  { size: 'XXS', num: '32', kr: '33', bust: '74-78', waist: '58-62', hips: '79-83' },
  { size: 'XS', num: '34', kr: '44', bust: '78-82', waist: '62-66', hips: '83-87' },
  { size: 'S', num: '36 ~ 38', kr: '55', bust: '82-90', waist: '66-74', hips: '87-94.5' },
  { size: 'M', num: '40 ~ 42', kr: '66', bust: '90-98', waist: '74-82.5', hips: '94.5-100.5' },
  { size: 'L', num: '44 ~ 46', kr: '77', bust: '98-107', waist: '82.5-93', hips: '100.5-107.5' },
  { size: 'XL', num: '48 ~ 50', kr: '88', bust: '107-119', waist: '93-105', hips: '107.5-117.5' },
  { size: 'XXL', num: '52 ~ 54', kr: '99', bust: '119-131', waist: '105-117.5', hips: '117.5-128' },
];

const WOMEN_BOTTOMS = [
  { size: 'XXS', num: '32', kr: '33', waist: '58-62', hips: '79-83' },
  { size: 'XS', num: '34', kr: '44', waist: '62-66', hips: '83-87' },
  { size: 'S', num: '36 ~ 38', kr: '55', waist: '66-74', hips: '87-94.5' },
  { size: 'M', num: '40 ~ 42', kr: '66', waist: '74-82.5', hips: '94.5-100.5' },
  { size: 'L', num: '44 ~ 46', kr: '77', waist: '82.5-93', hips: '100.5-107.5' },
  { size: 'XL', num: '48 ~ 50', kr: '88', waist: '93-105', hips: '107.5-117.5' },
  { size: 'XXL', num: '52 ~ 54', kr: '99', waist: '105-117.5', hips: '117.5-128' },
];

const MEN_TOPS = [
  { size: 'XS', num: '44', kr: '90', chest: '86-90', waist: '74-78' },
  { size: 'S', num: '46', kr: '95', chest: '90-94', waist: '78-82' },
  { size: 'M', num: '48-50', kr: '100', chest: '94-102', waist: '82-90' },
  { size: 'L', num: '52-54', kr: '105', chest: '102-110', waist: '90-98' },
  { size: 'XL', num: '56', kr: '110', chest: '110-118', waist: '98-106' },
  { size: 'XXL', num: '58', kr: '115', chest: '118-124', waist: '106-110' },
];

const MEN_BOTTOMS = [
  { size: 'XS', num: '38', kr: '28', waist: '74-78', hips: '90-94' },
  { size: 'S', num: '40', kr: '30', waist: '78-82', hips: '94-98' },
  { size: 'M', num: '42-44', kr: '32-34', waist: '82-90', hips: '98-106' },
  { size: 'L', num: '46-48', kr: '36-38', waist: '90-98', hips: '106-114' },
  { size: 'XL', num: '50', kr: '40', waist: '98-102', hips: '114-118' },
];

const SHOES_DATA = [
  { eu1: '34', kr1: '220', eu2: '35', kr2: '225' },
  { eu1: '36', kr1: '230', eu2: '37', kr2: '235' },
  { eu1: '38', kr1: '240', eu2: '39', kr2: '245' },
  { eu1: '40', kr1: '250', eu2: '41', kr2: '255' },
  { eu1: '42', kr1: '260', eu2: '-', kr2: '-' },
];

const KIDS_DATA = [
  { age: '3-4Y', height: '104', chest: '56', waist: '54' },
  { age: '4-5Y', height: '110', chest: '58', waist: '55' },
  { age: '5-6Y', height: '116', chest: '60', waist: '56' },
  { age: '7-8Y', height: '128', chest: '64', waist: '58' },
  { age: '9-10Y', height: '140', chest: '70', waist: '62' },
  { age: '11-12Y', height: '152', chest: '76', waist: '68' },
  { age: '13-14Y', height: '164', chest: '82', waist: '74' },
];

// --- Components ---

const BrandHeader = ({ brand, url, description, LogoComponent }: any) => (
  <div className="flex flex-col items-center text-center space-y-6">
    <div className="h-20 flex items-center justify-center">
      {LogoComponent}
    </div>
    {url && (
      <a 
        href={url} 
        target="_blank" 
        rel="noreferrer" 
        className="text-slate-400 font-bold text-lg hover:text-slate-600 transition-colors"
      >
        {url}
      </a>
    )}
    {description && (
      <p className="text-base md:text-lg leading-relaxed text-slate-800 break-keep max-w-2xl">
        {description}
      </p>
    )}
  </div>
);

const TableHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center mb-8 space-y-2">
    <h2 className="text-2xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
      {title}
    </h2>
    <p className="text-base md:text-lg font-bold text-slate-700">
      {subtitle}
    </p>
    <div className="pt-2 text-sm md:text-base text-blue-500 font-medium leading-relaxed">
      <p>브랜드 판매처에서 제공하는 사이즈 가이드 입니다.</p>
      <p>상품의 정확한 실측 치수가 아니기에 참고용으로 활용 부탁드립니다.</p>
    </div>
  </div>
);

const SizeTable = ({ title, columns, data, keys }: any) => (
  <div className="mb-12 border border-slate-200 rounded-lg overflow-hidden">
    <div className="bg-[#EEE] py-4 px-5 text-center font-bold text-slate-700 text-base md:text-lg">
      {title}
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-center border-collapse min-w-[700px]">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-200 text-sm md:text-base text-slate-700">
            {columns.map((col: string, i: number) => (
              <th key={i} className={`py-4 px-3 font-medium ${i < columns.length - 1 ? 'border-r border-slate-100' : ''}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 text-sm md:text-base text-slate-600">
              {keys.map((key: string, j: number) => (
                <td key={j} className={`py-3.5 px-3 ${j < keys.length - 1 ? 'border-r border-slate-100' : ''}`}>
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const BrandPage = ({ brand, url, description, LogoComponent }: any) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Box 1: Brand Introduction */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10">
        <BrandHeader brand={brand} url={url} description={description} LogoComponent={LogoComponent} />
      </div>

      {/* Box 2: Size Guide Content */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10">
        <Tabs defaultValue="women" className="w-full">
          <TabsList className="w-full h-auto grid grid-cols-4 bg-slate-50 p-1 rounded-xl gap-1 mb-10">
            {['women', 'men', 'shoes', 'kids'].map((tab) => (
              <TabsTrigger 
                  key={tab} 
                  value={tab}
                  className="text-xs md:text-sm font-bold py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-slate-400 capitalize"
              >
                {tab === 'women' ? '여성' : tab === 'men' ? '남성' : tab === 'shoes' ? '신발' : '키즈'}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="women">
            <TableHeader title={`${brand} 여성 사이즈 가이드`} subtitle="(단위 : CM, 신체 사이즈 기준)" />
            <SizeTable 
              title="탑 / 블라우스 / 원피스"
              columns={['사이즈', '사이즈', '한국', '가슴둘레', '허리둘레', '엉덩이']}
              keys={['size', 'num', 'kr', 'bust', 'waist', 'hips']}
              data={WOMEN_TOPS}
            />
            <SizeTable 
              title="스커트 / 바지"
              columns={['사이즈', '사이즈', '한국', '허리둘레', '엉덩이']}
              keys={['size', 'num', 'kr', 'waist', 'hips']}
              data={WOMEN_BOTTOMS}
            />
          </TabsContent>

          <TabsContent value="men">
            <TableHeader title={`${brand} 남성 사이즈 가이드`} subtitle="(단위 : CM, 신체 사이즈 기준)" />
            <SizeTable 
              title="탑 / 자켓 / 셔츠"
              columns={['사이즈', '사이즈', '한국', '가슴둘레', '허리둘레']}
              keys={['size', 'num', 'kr', 'chest', 'waist']}
              data={MEN_TOPS}
            />
            <SizeTable 
              title="바지 / 팬츠"
              columns={['사이즈', '사이즈', '한국', '허리둘레', '엉덩이']}
              keys={['size', 'num', 'kr', 'waist', 'hips']}
              data={MEN_BOTTOMS}
            />
          </TabsContent>

          <TabsContent value="shoes">
            <TableHeader title={`${brand} 신발 사이즈 가이드`} subtitle="(단위 : MM, 한국 사이즈 기준)" />
            <SizeTable 
              title="신발"
              columns={['EU 사이즈', '한국 (mm)', 'EU 사이즈', '한국 (mm)']}
              keys={['eu1', 'kr1', 'eu2', 'kr2']}
              data={SHOES_DATA}
            />
          </TabsContent>
          
          <TabsContent value="kids">
            <TableHeader title={`${brand} 키즈 사이즈 가이드`} subtitle="(단위 : CM, 신체 사이즈 기준)" />
            <SizeTable 
              title="아동복 (남/여 공용)"
              columns={['나이', '신장', '가슴둘레', '허리둘레']}
              keys={['age', 'height', 'chest', 'waist']}
              data={KIDS_DATA}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// --- SVGs ---

const ZaraLogo = () => (
  <svg width="240" height="60" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="65" textAnchor="middle" fontFamily="'Didot', 'Bodoni MT', serif" fontWeight="bold" fontSize="84" letterSpacing="-0.15em" fill="black">ZARA</text>
  </svg>
);

const CommonLogo = () => (
   <div className="text-4xl font-bold tracking-tight text-slate-900 font-nanum">SIZE GUIDE</div>
);

const MassimoLogo = () => (
  <svg width="300" height="60" viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="45" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="40" letterSpacing="0.05em" fill="#333">Massimo Dutti</text>
  </svg>
);

const HMLogo = () => (
  <svg width="100" height="70" viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="10" width="70" height="50" fill="#E50010" />
    <text x="50" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="32" fill="white">H&M</text>
  </svg>
);

// --- Main Component ---

export function SizeGuide() {
  return (
    <div className="w-full flex justify-center p-2 md:p-8 font-sans">
      <style>
        {`
          @import url('https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css');
          .font-nanum {
            font-family: 'NanumSquare Neo', 'NanumSquare', sans-serif;
          }
        `}
      </style>

      <div className="w-full max-w-[860px] font-nanum text-[#333]">
        <Tabs defaultValue="common" className="w-full">
          
          {/* Top Navigation Tabs */}
          <TabsList className="w-full h-auto grid grid-cols-2 md:grid-cols-4 bg-slate-50 p-1 rounded-xl gap-1 mb-8 border border-slate-200">
            {[
              { id: 'common', label: '공통' },
              { id: 'zara', label: 'ZARA' },
              { id: 'massimo', label: 'Massimo Dutti' },
              { id: 'hm', label: 'H&M' }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="text-xs md:text-sm font-bold py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-slate-400"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="common" className="mt-0">
            <BrandPage 
              brand="통합" 
              LogoComponent={<CommonLogo />}
              description="여러 브랜드의 사이즈를 아우르는 통합 가이드입니다. 브랜드별 상세 사이즈는 상단 탭을 이용해주세요."
            />
          </TabsContent>

          <TabsContent value="zara" className="mt-0">
            <BrandPage 
              brand="ZARA"
              url="https://zara.com/es"
              LogoComponent={<ZaraLogo />}
              description={<>
                글로벌 패션 그룹 인디텍스(INDITEX)의 대표적인 브랜드로<br className="hidden md:block" />
                트렌디한 디자인과 합리적인 가격으로 사랑받으며<br className="hidden md:block" />
                SPA 브랜드 중 세계 최대 매출을 기록하고 있습니다.
              </>}
            />
          </TabsContent>

          <TabsContent value="massimo" className="mt-0">
             <BrandPage 
              brand="Massimo Dutti"
              url="https://www.massimodutti.com/"
              LogoComponent={<MassimoLogo />}
              description={<>
                세련되고 클래식한 디자인을 선보이는 글로벌 브랜드입니다.<br className="hidden md:block" />
                고품질 소재와 절제된 스타일로 도시적인 우아함을 제안합니다.
              </>}
            />
          </TabsContent>

          <TabsContent value="hm" className="mt-0">
            <BrandPage 
              brand="H&M"
              url="https://www2.hm.com/"
              LogoComponent={<HMLogo />}
              description={<>
                지속 가능한 패션을 지향하는 글로벌 패션 브랜드입니다.<br className="hidden md:block" />
                다양한 스타일과 합리적인 가격으로 전 세계적인 사랑을 받고 있습니다.
              </>}
            />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
