import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import AppLayout from '../../components/ui/AppLayout';
import { getAverageColor, createHeroGradient } from '../../core/utils/imageColor';
import { ProjectType } from '../projects/models/ProjectType';

import ArtistAppearancesTable from './components/ArtistAppearancesTable';
import ArtistProjectGrid from './components/ArtistProjectGrid';
import { useArtist } from './hooks/useArtist';
import { useArtistAppearances } from './hooks/useArtistAppearances';
import { useArtistProjects } from './hooks/useArtistProjects';
import { ArtistTypeLabels } from './models/ArtistType';


const APPEARANCES_PAGE_SIZE = 10;

export const ArtistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: artist, isLoading, isError } = useArtist(id!);
  const singlesQuery = useArtistProjects(id!, ProjectType.SINGLE);
  const albumsQuery = useArtistProjects(id!, ProjectType.ALBUM);
  const epsQuery = useArtistProjects(id!, ProjectType.EP);
  const [appearancesPage, setAppearancesPage] = useState(1);
  const appearancesQuery = useArtistAppearances(id!, appearancesPage, APPEARANCES_PAGE_SIZE);
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

  useEffect(() => {
    const totalPages = appearancesQuery.data?.totalPages ?? 0;

    if (totalPages > 0 && appearancesPage > totalPages) {
      setAppearancesPage(totalPages);
    }
  }, [appearancesPage, appearancesQuery.data?.totalPages]);

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
          className="relative overflow-x-hidden pt-8 pb-6 px-4 sm:pt-12 sm:pb-8 sm:px-6 min-h-[260px] sm:min-h-[340px]"
          style={{
            background: heroGradient,
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
          
          <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-end sm:text-left sm:gap-6">
            {/* Artist Image */}
            {artist.photoLink ? (
              <img
                src={artist.photoLink}
                alt={artist.name}
                className="size-32 shrink-0 rounded-full object-cover shadow-2xl sm:size-40 md:size-48"
              />
            ) : (
              <div className="size-32 shrink-0 rounded-full bg-gray-100 flex items-center justify-center shadow-2xl sm:size-40 md:size-48">
                <svg
                  className="size-16 text-gray-400 sm:size-20 md:size-24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}

            {/* Artist Info */}
            <div className="min-w-0 w-full max-w-full flex-1 pb-2 sm:pb-4">
              <p className="text-sm font-semibold mb-2 text-white">
                {ArtistTypeLabels[artist.type]}
              </p>
              <h1 className="text-3xl font-bold leading-tight text-white break-words sm:text-4xl md:text-5xl lg:text-6xl sm:leading-none">
                {artist.name}
              </h1>
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
              <ArtistProjectGrid
                projects={singlesQuery.data?.content ?? []}
                isLoading={singlesQuery.isLoading}
                emptyTitle="Aucun single"
                emptyDescription="Les singles où cet artiste est artiste principal apparaîtront ici."
              />
            </div>

            {/* Albums Tab */}
            <div
              id="tabs-with-underline-2"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tabs-with-underline-item-2"
            >
              <ArtistProjectGrid
                projects={albumsQuery.data?.content ?? []}
                isLoading={albumsQuery.isLoading}
                emptyTitle="Aucun album"
                emptyDescription="Les albums où cet artiste est artiste principal apparaîtront ici."
              />
            </div>

            {/* EPs Tab */}
            <div
              id="tabs-with-underline-3"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tabs-with-underline-item-3"
            >
              <ArtistProjectGrid
                projects={epsQuery.data?.content ?? []}
                isLoading={epsQuery.isLoading}
                emptyTitle="Aucun EP"
                emptyDescription="Les EPs où cet artiste est artiste principal apparaîtront ici."
              />
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Apparaît sur</h2>
            <ArtistAppearancesTable
              appearances={appearancesQuery.data?.content ?? []}
              isLoading={appearancesQuery.isLoading}
              page={appearancesPage}
              pageSize={APPEARANCES_PAGE_SIZE}
              totalPages={appearancesQuery.data?.totalPages ?? 0}
              onPageChange={setAppearancesPage}
            />
          </div>
        </div>
      </div>
      </div>
    </AppLayout>
  );
};
