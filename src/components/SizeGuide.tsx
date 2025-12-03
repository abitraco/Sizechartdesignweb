import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BRAND_SIZE_DATA as INITIAL_DATA } from '../data/brandSizeData';
import { fetchSizeData } from '../services/sizeDataService';

// --- Configuration ---
// TODO: 구글 시트의 "파일 > 공유 > 웹에 게시" 에서 "CSV" 형식을 선택하고 생성된 링크를 아래에 입력하세요.
const GOOGLE_SHEET_CSV_URL = "1nzPyuZiU9SW8NKlaXnXylglysNn1BGCafVCxw0UpCDc";

// --- Components ---

interface BrandHeaderProps {
  brand: string;
  url: string;
  description: React.ReactNode;
  LogoComponent: React.ReactNode;
}

const BrandHeader = ({ brand, url, description, LogoComponent }: BrandHeaderProps) => (
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
      <p className="text-base md:text-2xl leading-relaxed text-slate-800 break-keep max-w-2xl">
        {description}
      </p>
    )}
  </div>
);

const TableHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center mb-10 space-y-3">
    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight break-keep">
      {title}
    </h2>
    <p className="text-xl md:text-2xl font-bold text-slate-700">
      {subtitle}
    </p>
    <div className="pt-4 text-base md:text-lg text-blue-500 font-medium leading-relaxed break-keep">
      <p>브랜드 판매처에서 제공하는 사이즈 가이드 입니다.</p>
      <p>상품의 정확한 실측 치수가 아니기에 참고용으로 활용 부탁드립니다.</p>
    </div>
  </div>
);

interface SizeTableProps {
  title: string;
  columns: string[];
  data: any[];
  keys: string[];
}

const SizeTable = ({ title, columns, data, keys }: SizeTableProps) => (
  <div className="mb-12">
    <div className="bg-[#EEE] py-4 px-4 text-center font-bold text-slate-800 text-3xl rounded-t-lg border border-slate-300 border-b-0">
      {title}
    </div>
    <div className="overflow-x-auto border border-slate-300 rounded-b-lg">
      <table className="w-full text-center border-collapse min-w-[350px]">
        <thead>
          <tr className="bg-slate-50 text-2xl font-bold text-slate-800">
            {columns.map((col: string, i: number) => (
              <th key={i} className={`py-4 px-2 font-bold border-b border-slate-300 ${i < columns.length - 1 ? 'border-r border-slate-200' : ''} whitespace-nowrap ${i === 0 ? 'bg-slate-50 min-w-[100px]' : ''}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i} className="hover:bg-slate-50 text-2xl font-bold text-slate-900">
              {keys.map((key: string, j: number) => (
                <td key={j} className={`py-4 px-2 border-b border-slate-200 ${j < keys.length - 1 ? 'border-r border-slate-200' : ''} ${i === data.length - 1 ? 'border-b-0' : ''} ${j === 0 ? 'bg-slate-50' : ''}`}>
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

interface BrandPageProps {
  brand: string;
  url: string;
  description: React.ReactNode;
  LogoComponent: React.ReactNode;
  sizeData: {
    tabs: string[];
    women?: any[] | { title: string; columns: string[]; keys: string[]; data: any[] }[];
    womenTops?: any[];
    womenBottoms?: any[];
    men?: any[] | { title: string; columns: string[]; keys: string[]; data: any[] }[];
    menTops?: any[];
    menBottoms?: any[];
    shoes?: any[] | { title: string; columns: string[]; keys: string[]; data: any[] }[];
    kids?: any[] | { title: string; columns: string[]; keys: string[]; data: any[] }[];
  };
}

const BrandPage = ({ brand, url, description, LogoComponent, sizeData }: BrandPageProps) => {
  const { tabs, women, men, womenTops, womenBottoms, menTops, menBottoms, shoes, kids } = sizeData;

  // Helper to distinguish between array of data rows vs array of table definitions
  const isMultiTable = (data: any[]) => Array.isArray(data) && data.length > 0 && 'data' in data[0];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Box 0: TITLE */}
      <div className="text-center bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10">
        <p className="text-4xl font-extrabold text-slate-900 tracking-tight">스페인샵 사이즈 가이드</p>
      </div>

      {/* Box 1: Brand Introduction */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-10">
        <BrandHeader brand={brand} url={url} description={description} LogoComponent={LogoComponent} />
      </div>

      {/* Box 2: Size Guide Content */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-4">
        <Tabs defaultValue={tabs[0]} className="w-full">
          <TabsList className="w-full h-auto grid grid-cols-4 bg-slate-50 p-1 rounded-xl gap-1 mb-10">
            {tabs.map((tab: string) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-xs md:text-sm font-bold py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm text-slate-400 capitalize"
              >
                {tab === 'women' ? '여성' : tab === 'men' ? '남성' : tab === 'shoes' ? '신발' : '키즈'}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.includes('women') && (
            <TabsContent value="women">
              <TableHeader title={`${brand} 여성 사이즈 가이드`} subtitle="(단위 : CM, 신체 사이즈 기준)" />
              {women && Array.isArray(women) ? (
                women.map((table: any, index: number) => (
                  <SizeTable
                    key={index}
                    title={table.title}
                    columns={table.columns}
                    keys={table.keys}
                    data={table.data}
                  />
                ))
              ) : (
                <>
                  <SizeTable
                    title="탑 / 블라우스 / 원피스"
                    columns={['사이즈', '사이즈', '한국', '가슴둘레', '허리둘레']}
                    keys={['size', 'num', 'kr', 'bust', 'waist']}
                    data={womenTops || []}
                  />
                  <SizeTable
                    title="스커트 / 바지"
                    columns={['사이즈', '사이즈', '한국', '허리둘레']}
                    keys={['size', 'num', 'kr', 'waist']}
                    data={womenBottoms || []}
                  />
                </>
              )}
            </TabsContent>
          )}

          {tabs.includes('men') && (
            <TabsContent value="men">
              <TableHeader title={`${brand} 남성 사이즈 가이드`} subtitle="(단위 : CM, 신체 사이즈 기준)" />
              {men && isMultiTable(men) ? (
                men.map((table: any, index: number) => (
                  <SizeTable
                    key={index}
                    title={table.title}
                    columns={table.columns}
                    keys={table.keys}
                    data={table.data}
                  />
                ))
              ) : (
                <>
                  <SizeTable
                    title="탑 / 자켓 / 셔츠"
                    columns={['사이즈', '사이즈', '한국', '가슴둘레', '허리둘레']}
                    keys={['size', 'num', 'kr', 'chest', 'waist']}
                    data={menTops || []}
                  />
                  <SizeTable
                    title="바지 / 팬츠"
                    columns={['사이즈', '사이즈', '한국', '허리둘레']}
                    keys={['size', 'num', 'kr', 'waist']}
                    data={menBottoms || []}
                  />
                </>
              )}
            </TabsContent>
          )}

          {tabs.includes('shoes') && (
            <TabsContent value="shoes">
              <TableHeader title={`${brand} 신발 사이즈 가이드`} subtitle="(단위 : MM, 한국 사이즈 기준)" />
              {shoes && isMultiTable(shoes) ? (
                shoes.map((table: any, index: number) => (
                  <SizeTable
                    key={index}
                    title={table.title}
                    columns={table.columns}
                    keys={table.keys}
                    data={table.data}
                  />
                ))
              ) : (
                <SizeTable
                  title="신발"
                  columns={['EU 사이즈', '한국 (mm)', 'EU 사이즈', '한국 (mm)']}
                  keys={['eu1', 'kr1', 'eu2', 'kr2']}
                  data={shoes || []}
                />
              )}
            </TabsContent>
          )}

          {tabs.includes('kids') && (
            <TabsContent value="kids">
              <TableHeader title={`${brand} 키즈 사이즈 가이드`} subtitle="(단위 : CM, 신체 사이즈 기준)" />
              {kids && isMultiTable(kids) ? (
                kids.map((table: any, index: number) => (
                  <SizeTable
                    key={index}
                    title={table.title}
                    columns={table.columns}
                    keys={table.keys}
                    data={table.data}
                  />
                ))
              ) : (
                <SizeTable
                  title="아동복 (남/여 공용)"
                  columns={['나이', '신장', '가슴둘레', '허리둘레']}
                  keys={['age', 'height', 'chest', 'waist']}
                  data={kids || []}
                />
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

// --- Brands Data ---

const BRANDS = [
  {
    id: 'common',
    label: '공통',
    url: '',
    description: '여러 브랜드의 사이즈를 아우르는 통합 가이드입니다. 브랜드별 상세 사이즈는 상단 탭을 이용해주세요.',
    LogoComponent: () => (
      <svg width="240" height="60" viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="55" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="50" letterSpacing="0.05em" fill="#1e293b">SIZE GUIDE</text>
      </svg>
    )
  },
  {
    id: 'zara',
    label: 'ZARA',
    url: 'https://www.zara.com/es/',
    description: <>글로벌 패션 그룹 인디텍스(INDITEX)의 대표적인 브랜드로<br className="hidden md:block" />트렌디한 디자인과 합리적인 가격으로 사랑받으며<br className="hidden md:block" />SPA 브랜드 중 세계 최대 매출을 기록하고 있습니다.</>,
    LogoComponent: () => (
      <svg width="240" height="60" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="65" textAnchor="middle" fontFamily="'Didot', 'Bodoni MT', serif" fontWeight="bold" fontSize="84" letterSpacing="-0.15em" fill="black">ZARA</text>
      </svg>
    )
  },
  {
    id: 'massimo',
    label: 'Massimo Dutti',
    url: 'https://www.massimodutti.com/',
    description: <>세련되고 클래식한 디자인을 선보이는 글로벌 브랜드입니다.<br className="hidden md:block" />고품질 소재와 절제된 스타일로 도시적인 우아함을 제안합니다.</>,
    LogoComponent: () => (
      <svg width="300" height="60" viewBox="0 0 500 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="'Times New Roman', serif" fontWeight="bold" fontSize="48" letterSpacing="0.05em" fill="#333">Massimo Dutti</text>
      </svg>
    )
  },
  {
    id: 'bershka',
    label: 'Bershka',
    url: 'https://www.bershka.com/',
    description: '젊고 모험적인 고객을 위한 트렌디한 패션을 선보이며, 음악과 기술, 소셜 미디어의 최신 트렌드를 반영합니다.',
    LogoComponent: () => (
      <svg width="240" height="60" viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="50" letterSpacing="-0.05em" fill="black">Bershka</text>
      </svg>
    )
  },
  {
    id: 'stradivarius',
    label: 'Stradivarius',
    url: 'https://www.stradivarius.com/',
    description: '창의적이고 독창적인 패션을 추구하는 브랜드로, 젊은 여성들의 감성을 자극하는 트렌디한 스타일을 제안합니다.',
    LogoComponent: () => (
      <svg width="280" height="60" viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontWeight="900" fontSize="48" fill="black">Stradivarius</text>
      </svg>
    )
  },
  {
    id: 'pullandbear',
    label: 'Pull&Bear',
    url: 'https://www.pullandbear.com/',
    description: '편안하고 캐주얼한 스타일을 지향하며, 젊은 세대의 라이프스타일과 문화를 반영한 컬렉션을 선보입니다.',
    LogoComponent: () => (
      <svg width="280" height="60" viewBox="0 0 350 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="48" fill="black">Pull&Bear</text>
      </svg>
    )
  },

  {
    id: 'mango',
    label: 'MANGO',
    url: 'https://shop.mango.com/',
    description: '지중해 스타일의 본질을 담은 패션 브랜드로, 현대적인 여성과 남성을 위한 세련된 컬렉션을 선보입니다.',
    LogoComponent: () => (
      <svg width="240" height="60" viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="48" letterSpacing="0.2em" fill="black">MANGO</text>
      </svg>
    )
  },

  {
    id: 'hm',
    label: 'H&M',
    url: 'https://www.hm.com/',
    description: <>지속 가능한 패션을 지향하는 글로벌 패션 브랜드입니다.<br className="hidden md:block" />다양한 스타일과 합리적인 가격으로 전 세계적인 사랑을 받고 있습니다.</>,
    LogoComponent: () => (
      <svg width="160" height="80" viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="5" width="140" height="70" fill="#E50010" />
        <text x="80" y="55" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="48" fill="white">H&M</text>
      </svg>
    )
  },
  {
    id: 'cos',
    label: 'COS',
    url: 'https://www.cos.com/',
    description: '모던하고 기능적인 디자인을 추구하는 브랜드로, 시대를 초월하는 스타일과 퀄리티를 제공합니다.',
    LogoComponent: () => (
      <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="60" letterSpacing="0.05em" fill="black">COS</text>
      </svg>
    )
  },
  {
    id: 'arket',
    label: 'ARKET',
    url: 'https://www.arket.com/',
    description: '지속 가능성과 내구성을 중시하는 모던 라이프스타일 마켓으로, 에센셜 아이템을 제공합니다.',
    LogoComponent: () => (
      <svg width="200" height="60" viewBox="0 0 260 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="50" letterSpacing="0.1em" fill="black">ARKET</text>
      </svg>
    )
  },
  {
    id: 'otherstories',
    label: '& Other Stories',
    url: 'https://www.stories.com/',
    description: '파리, 스톡홀름, 로스앤젤레스의 아틀리에에서 영감을 받은 다양한 스타일의 컬렉션을 제공합니다.',
    LogoComponent: () => (
      <svg width="300" height="60" viewBox="0 0 450 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="36" fill="black">& Other Stories</text>
      </svg>
    )
  },

  {
    id: 'oysho',
    label: 'Oysho',
    url: 'https://www.oysho.com/',
    description: '란제리, 짐웨어, 비치웨어 등 다양한 라인을 통해 여성의 아름다움과 편안함을 동시에 추구합니다.',
    LogoComponent: () => (
      <svg width="200" height="60" viewBox="0 0 250 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="50" fill="black">Oysho</text>
      </svg>
    )
  },
  {
    id: 'bimbaylola',
    label: 'BIMBA Y LOLA',
    url: 'https://www.bimbaylola.com/',
    description: '예술과 문화를 사랑하는 이들을 위한 스페인 브랜드로, 독특한 프린트와 대담한 색감이 특징입니다.',
    LogoComponent: () => (
      <svg width="300" height="60" viewBox="0 0 450 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="36" letterSpacing="0.1em" fill="black">BIMBA Y LOLA</text>
      </svg>
    )
  },
  {
    id: 'desigual',
    label: 'Desigual',
    url: 'https://www.desigual.com/',
    description: '낙관적이고 차별화된 디자인을 통해 개성을 표현하는 브랜드로, 화려한 패턴과 색채가 돋보입니다.',
    LogoComponent: () => (
      <svg width="240" height="60" viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="50" fill="black" transform="scale(1, -1) translate(0, -60)">Desigual</text>
      </svg>
    )
  },
  {
    id: 'camper',
    label: 'Camper',
    url: 'https://www.camper.com/',
    description: '마요르카에서 시작된 컨템포러리 슈즈 브랜드로, 창의적인 디자인과 편안한 착화감을 자랑합니다.',
    LogoComponent: () => (
      <svg width="240" height="60" viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="50" fill="#E3001B">CAMPER</text>
      </svg>
    )
  },
  {
    id: 'sfera',
    label: 'Sfera',
    url: 'https://www.sfera.com/',
    description: '엘 코르테 잉글레스 그룹의 패션 브랜드로, 합리적인 가격에 최신 트렌드를 반영한 의류를 제공합니다.',
    LogoComponent: () => (
      <svg width="200" height="60" viewBox="0 0 250 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="50" fill="black">Sfera</text>
      </svg>
    )
  },
  {
    id: 'springfield',
    label: 'Springfield',
    url: 'https://myspringfield.com/',
    description: '캐주얼하고 도시적인 스타일을 추구하는 브랜드로, 편안함과 스타일을 동시에 만족시킵니다.',
    LogoComponent: () => (
      <svg width="300" height="60" viewBox="0 0 500 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="44" fill="black">SPRINGFIELD</text>
      </svg>
    )
  },
  {
    id: 'maje',
    label: 'Maje',
    url: 'https://fr.maje.com/',
    description: '파리지앵의 시크함과 여성스러움을 담은 브랜드로, 섬세한 디테일과 모던한 실루엣이 돋보입니다.',
    LogoComponent: () => (
      <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="serif" fontWeight="900" fontSize="50" fill="black">maje</text>
      </svg>
    )
  },
  {
    id: 'sandro',
    label: 'Sandro',
    url: 'https://fr.sandro-paris.com/',
    description: '우아함과 쿨한 감성이 공존하는 프렌치 시크 브랜드로, 깔끔한 라인과 고급스러운 소재를 사용합니다.',
    LogoComponent: () => (
      <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="50" fill="black">sandro</text>
      </svg>
    )
  },
  {
    id: 'tous',
    label: 'TOUS',
    url: 'https://www.tous.com/',
    description: '곰돌이 심볼로 유명한 스페인 주얼리 및 잡화 브랜드로, 사랑스럽고 접근하기 쉬운 럭셔리를 지향합니다.',
    LogoComponent: () => (
      <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="50" fill="black">TOUS</text>
      </svg>
    )
  },
  {
    id: 'unode50',
    label: 'Uno de 50',
    url: 'https://www.unode50.com/',
    description: '독창적이고 대담한 디자인의 핸드메이드 주얼리 브랜드로, 개성 넘치는 스타일을 완성해줍니다.',
    LogoComponent: () => (
      <svg width="240" height="60" viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="cursive" fontWeight="900" fontSize="44" fill="black">Uno de 50</text>
      </svg>
    )
  },
  {
    id: 'womensecret',
    label: "Women's Secret",
    url: 'https://womensecret.com/',
    description: '여성을 위한 속옷, 잠옷, 수영복 전문 브랜드로, 편안함과 여성스러움을 강조합니다.',
    LogoComponent: () => (
      <svg width="300" height="60" viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="serif" fontWeight="900" fontSize="40" fill="black">women'secret</text>
      </svg>
    )
  },
  {
    id: 'adolfodominguez',
    label: 'Adolfo Dominguez',
    url: 'https://www.adolfodominguez.com/',
    description: '단순함과 우아함을 추구하는 디자이너 브랜드로, 지속 가능한 패션과 자연스러운 소재를 중요시합니다.',
    LogoComponent: () => (
      <svg width="350" height="60" viewBox="0 0 600 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="serif" fontWeight="900" fontSize="32" fill="black">ADOLFO DOMINGUEZ</text>
      </svg>
    )
  },
  {
    id: 'purificaciongarcia',
    label: 'Purificación García',
    url: 'https://purificaciongarcia.com/',
    description: '세련되고 현대적인 디자인을 선보이는 스페인 디자이너 브랜드로, 미니멀리즘과 기하학적 패턴이 특징입니다.',
    LogoComponent: () => (
      <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="60" fill="black">PG</text>
      </svg>
    )
  },
];

const KIDS_BRANDS = [
  {
    id: 'zarakids',
    label: 'ZARA 키즈',
    url: 'https://www.zara.com/es/en/kids-l1.html',
    description: '트렌디하고 편안한 스타일의 키즈 컬렉션으로, 아이들의 활동성을 고려한 디자인을 선보입니다.',
    LogoComponent: () => (
      <svg width="240" height="60" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="65" textAnchor="middle" fontFamily="'Didot', 'Bodoni MT', serif" fontWeight="bold" fontSize="84" letterSpacing="-0.15em" fill="black">ZARA</text>
      </svg>
    )
  },
  {
    id: 'mangokids',
    label: 'MANGO 키즈',
    url: 'https://shop.mango.com/es/kids',
    description: '편안함과 스타일을 모두 갖춘 키즈 라인으로, 다양한 연령대를 위한 세련된 룩을 제공합니다.',
    LogoComponent: () => (
      <svg width="240" height="60" viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="48" letterSpacing="0.2em" fill="black">MANGO</text>
      </svg>
    )
  },
  {
    id: 'bobochoses',
    label: '보보쇼즈',
    url: 'https://www.bobochoses.com/',
    description: '창의적이고 재미있는 디자인으로 아이들의 상상력을 자극하는 스페인 키즈 브랜드입니다.',
    LogoComponent: () => (
      <svg width="280" height="60" viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="48" fill="black">Bobo Choses</text>
      </svg>
    )
  },
  {
    id: 'tinycottons',
    label: '타이니코튼',
    url: 'https://www.tinycottons.com/',
    description: '고품질의 피마 코튼을 사용하여 아이들에게 최상의 편안함과 스타일을 선물하는 브랜드입니다.',
    LogoComponent: () => (
      <svg width="280" height="60" viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="45" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="48" fill="black">Tiny Cottons</text>
      </svg>
    )
  }
];

export function SizeGuide() {
  const [sizeData, setSizeData] = useState<any>(INITIAL_DATA);

  useEffect(() => {
    if (GOOGLE_SHEET_CSV_URL) {
      let url = GOOGLE_SHEET_CSV_URL;
      // If it looks like a Sheet ID (no slashes, long string), construct the export URL
      if (!url.includes('/') && url.length > 20) {
        url = `https://docs.google.com/spreadsheets/d/${url}/export?format=csv`;
      }
      fetchSizeData(url).then(setSizeData);
    }
  }, []);

  return (
    <div className="w-full flex justify-center p-2 md:p-8 font-sans">
      <style>
        {`
          @import url('https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css');
          .font-nanum {
            font-family: 'NanumSquare Neo', 'NanumSquare', sans-serif;
          }
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}
      </style>

      <div className="w-full max-w-[750px] font-nanum text-[#333]">
        <Tabs defaultValue="common" className="w-full">

          {/* Top Navigation Tabs - Split into rows of 5 */}
          <div className="flex flex-col gap-2 mb-8">
            {Array.from({ length: Math.ceil(BRANDS.length / 5) }).map((_, i) => (
              <TabsList key={`brand-row-${i}`} className="w-full h-auto flex flex-wrap justify-center gap-2">
                {BRANDS.slice(i * 5, (i + 1) * 5).map((brand) => (
                  <TabsTrigger
                    key={brand.id}
                    value={brand.id}
                    className="flex-grow md:flex-grow-0 text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-200"
                  >
                    {brand.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            ))}

            <div className="w-full h-px bg-slate-200 my-2"></div>

            <TabsList className="w-full h-auto flex flex-wrap justify-center gap-2">
              {KIDS_BRANDS.map((brand) => (
                <TabsTrigger
                  key={brand.id}
                  value={brand.id}
                  className="flex-grow md:flex-grow-0 text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-200"
                >
                  {brand.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {BRANDS.map((brand) => (
            <TabsContent key={brand.id} value={brand.id} className="mt-0">
              <BrandPage
                brand={brand.label}
                url={brand.url}
                LogoComponent={<brand.LogoComponent />}
                description={brand.description}
                sizeData={sizeData[brand.id] || sizeData['common']}
              />
            </TabsContent>
          ))}

          {KIDS_BRANDS.map((brand) => (
            <TabsContent key={brand.id} value={brand.id} className="mt-0">
              <BrandPage
                brand={brand.label}
                url={brand.url}
                LogoComponent={<brand.LogoComponent />}
                description={brand.description}
                sizeData={sizeData[brand.id]}
              />
            </TabsContent>
          ))}

        </Tabs>
      </div>
    </div>
  );
}
