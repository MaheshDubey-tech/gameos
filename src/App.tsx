import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { MainExecutionPage } from './components/MainExecutionPage';
import { ExamplesArchivePage } from './components/ExamplesArchivePage';
import { NewGameSetupPage } from './components/NewGameSetupPage';
import { GAME_PRESETS } from './data/mockData';
import { GamePreset } from './types';

export function App() {
  const [currentView, setCurrentView] = useState<'LANDING' | 'MAIN_EXECUTION' | 'EXAMPLES_ARCHIVE' | 'NEW_GAME_SETUP'>('LANDING');
  const [activeGame, setActiveGame] = useState<GamePreset>(GAME_PRESETS[0]);

  const handleEnterMainExecution = () => {
    setCurrentView('MAIN_EXECUTION');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToExamples = () => {
    setCurrentView('EXAMPLES_ARCHIVE');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNewGameSetup = () => {
    setCurrentView('NEW_GAME_SETUP');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToIntro = () => {
    setCurrentView('LANDING');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGameCreated = (newGame: GamePreset) => {
    setActiveGame(newGame);
    setCurrentView('MAIN_EXECUTION');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'NEW_GAME_SETUP') {
    return (
      <div className="min-h-screen bg-[#EEF2F6] text-[#0F1D38] pb-16">
        <NewGameSetupPage
          onGameCreated={handleGameCreated}
          onCancel={handleEnterMainExecution}
        />
      </div>
    );
  }

  if (currentView === 'EXAMPLES_ARCHIVE') {
    return (
      <ExamplesArchivePage
        onBackToMainExecution={handleEnterMainExecution}
        onBackToIntro={handleBackToIntro}
      />
    );
  }

  if (currentView === 'MAIN_EXECUTION') {
    return (
      <MainExecutionPage
        activeGame={activeGame}
        onOpenNewGameSetup={handleOpenNewGameSetup}
        onNavigateToExamples={handleNavigateToExamples}
        onBackToIntro={handleBackToIntro}
      />
    );
  }

  return (
    <LandingPage
      onEnterPlatform={handleEnterMainExecution}
    />
  );
}

export default App;
