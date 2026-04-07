import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArtist } from './hooks/useArtist';
import { ArtistTypeLabels } from './models/ArtistType';
import { getAverageColor, createHeroGradient } from '../../core/utils/imageColor';
import AppLayout from '../../components/ui/AppLayout';

export const ArtistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: artist, isLoading, isError } = useArtist(id!);
  const [heroGradient, setHeroGradient] = useState<string>('linear-gradient(to bottom, rgb(83, 83, 83) 0%, rgba(18, 18, 18, 1) 100%)');

  useEffect(() => {
    if (artist?.photoLink) {
      getAverageColor(artist.photoLink).then((color) => {
        setHeroGradient(createHeroGradient(color));
      });
    }
  }, [artist?.photoLink]);

  useEffect(() => {
    // Initialize Preline tabs
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit(['tabs']);
    }
  }, [artist]);

  if (isLoading) {
    return (
      <AppLayout title="Artiste" maxWidth="full" hideHeader={true}>
        <div className="flex items-center justify-center h-full">
          <div
            className="animate-spin inline-block size-12 border-[3px] border-current border-t-transparent text-gray-800 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Chargement...</span>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (isError || !artist) {
    return (
      <AppLayout title="Artiste" maxWidth="full" hideHeader={true}>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="max-w-sm mx-auto text-center">
            <svg
              className="size-16 mx-auto text-red-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Artiste introuvable</h2>
            <p className="text-gray-600 mb-6">
              L'artiste que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <button
              type="button"
              onClick={() => navigate('/artists')}
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Retour aux artistes
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={artist.name} maxWidth="full" hideHeader={true}>
      <div className="h-full -m-4 sm:-m-6 lg:-m-8">
        {/* Hero Section */}
        <div
          className="relative pt-12 pb-8 px-6"
          style={{
            background: heroGradient,
            minHeight: '340px',
          }}
        >
          <div className="max-w-7xl mx-auto">
          {/* Back button - Preline Style */}
          <button
            type="button"
            onClick={() => navigate('/artists')}
            className="mb-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white/80 hover:text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Retour aux artistes
          </button>
          
          <div className="flex items-end gap-6">
            {/* Artist Image */}
            {artist.photoLink && (
              <img
                src={artist.photoLink}
                alt={artist.name}
                className="w-48 h-48 rounded-full shadow-2xl object-cover"
              />
            )}

            {/* Artist Info */}
            <div className="flex-1 pb-4">
              <p className="text-sm font-semibold mb-2 text-white">
                {ArtistTypeLabels[artist.type]}
              </p>
              <h1 className="text-6xl font-bold mb-4 text-white">{artist.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Tabs Navigation - Preline Component */}
          <div className="border-b border-gray-200 mb-8">
            <nav
              className="flex gap-x-2"
              aria-label="Tabs"
              role="tablist"
              aria-orientation="horizontal"
            >
              <button
                type="button"
                className="hs-tab-active:font-semibold hs-tab-active:border-gray-800 hs-tab-active:text-gray-800 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active"
                id="tabs-with-underline-item-1"
                aria-selected="true"
                data-hs-tab="#tabs-with-underline-1"
                aria-controls="tabs-with-underline-1"
                role="tab"
              >
                Singles
              </button>
              <button
                type="button"
                className="hs-tab-active:font-semibold hs-tab-active:border-gray-800 hs-tab-active:text-gray-800 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                id="tabs-with-underline-item-2"
                aria-selected="false"
                data-hs-tab="#tabs-with-underline-2"
                aria-controls="tabs-with-underline-2"
                role="tab"
              >
                Albums
              </button>
              <button
                type="button"
                className="hs-tab-active:font-semibold hs-tab-active:border-gray-800 hs-tab-active:text-gray-800 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                id="tabs-with-underline-item-3"
                aria-selected="false"
                data-hs-tab="#tabs-with-underline-3"
                aria-controls="tabs-with-underline-3"
                role="tab"
              >
                EPs
              </button>
            </nav>
          </div>

          {/* Tabs Content */}
          <div className="mt-3">
            {/* Singles Tab */}
            <div
              id="tabs-with-underline-1"
              role="tabpanel"
              aria-labelledby="tabs-with-underline-item-1"
            >
              {/* Empty State - Preline Style */}
              <div className="max-w-sm mx-auto text-center py-16">
                <svg
                  className="size-16 mx-auto text-gray-400 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Aucun single disponible
                </h3>
                <p className="text-gray-600">
                  Les singles de cet artiste apparaîtront ici prochainement.
                </p>
              </div>
            </div>

            {/* Albums Tab */}
            <div
              id="tabs-with-underline-2"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tabs-with-underline-item-2"
            >
              {/* Empty State - Preline Style */}
              <div className="max-w-sm mx-auto text-center py-16">
                <svg
                  className="size-16 mx-auto text-gray-400 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Aucun album disponible
                </h3>
                <p className="text-gray-600">
                  Les albums de cet artiste apparaîtront ici prochainement.
                </p>
              </div>
            </div>

            {/* EPs Tab */}
            <div
              id="tabs-with-underline-3"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tabs-with-underline-item-3"
            >
              {/* Empty State - Preline Style */}
              <div className="max-w-sm mx-auto text-center py-16">
                <svg
                  className="size-16 mx-auto text-gray-400 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Aucun EP disponible
                </h3>
                <p className="text-gray-600">
                  Les EPs de cet artiste apparaîtront ici prochainement.
                </p>
              </div>
            </div>
          </div>

          {/* Playlist Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Apparaît sur</h2>
            {/* Empty State - Preline Style */}
            <div className="max-w-sm mx-auto text-center py-16">
              <svg
                className="size-16 mx-auto text-gray-400 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Aucune playlist disponible
              </h3>
              <p className="text-gray-600">
                Les playlists avec cet artiste apparaîtront ici prochainement.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </AppLayout>
  );
};
