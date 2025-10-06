'use client';

import {useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';

export default function StorageCalculatorExamples() {
  const t = useTranslations('storageCalc');
  const router = useRouter();

  const examples = [
    {
      id: 'photo',
      title: t('examples.photo'),
      result: t('examples.photoResult'),
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'from-blue-500 to-indigo-500',
      params: {
        fromValue: '5',
        fromUnit: 'mb',
        toUnit: 'kb'
      }
    },
    {
      id: 'song',
      title: t('examples.song'),
      result: t('examples.songResult'),
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      bgColor: 'from-green-500 to-emerald-500',
      params: {
        fromValue: '4',
        fromUnit: 'mb',
        toUnit: 'kb'
      }
    },
    {
      id: 'video',
      title: t('examples.video'),
      result: t('examples.videoResult'),
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'from-purple-500 to-pink-500',
      params: {
        fromValue: '1',
        fromUnit: 'gb',
        toUnit: 'mb'
      }
    },
    {
      id: 'game',
      title: t('examples.game'),
      result: t('examples.gameResult'),
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
        </svg>
      ),
      bgColor: 'from-orange-500 to-red-500',
      params: {
        fromValue: '50',
        fromUnit: 'gb',
        toUnit: 'mb'
      }
    }
  ];

  const handleExampleClick = (params: any) => {
    const searchParams = new URLSearchParams(params);
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('examples.title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Common storage conversion examples to help you understand how the calculator works
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => handleExampleClick(example.params)}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group w-full text-left cursor-pointer"
          >
            <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${example.bgColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {example.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {example.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {example.result}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
