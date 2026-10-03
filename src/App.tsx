import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { ToastProvider, useToast } from './components/common/Toast';
import { DashboardView } from './components/views/DashboardView';
import { ContentStudioView } from './components/views/ContentStudioView';
import { AIAnalysisView } from './components/views/AIAnalysisView';
import { AIClipsView } from './components/views/AIClipsView';
import { AIEditorView } from './components/views/AIEditorView';
import { RepurposeStudioView } from './components/views/RepurposeStudioView';
import { ScriptGeneratorView } from './components/views/ScriptGeneratorView';
import { AssetLibraryView } from './components/views/AssetLibraryView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SignInView } from './components/views/SignInView';
import type { NavRoute, WorkflowStep, Clip } from './types';
import { DEMO_CLIPS } from './data/mockData';

interface UserProfile {
  name: string;
  handle: string;
  email: string;
}

const MainApp: React.FC = () => {
  const { showToast } = useToast();
  
  // 1st page is ALWAYS the Sign In page by default
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile>({
    name: '',
    handle: '',
    email: ''
  });

  const [currentRoute, setCurrentRoute] = useState<NavRoute>('dashboard');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedClip, setSelectedClip] = useState<Clip>(DEMO_CLIPS[0]);

  // Step-to-Route mapper
  const handleSelectWorkflowStep = (step: WorkflowStep) => {
    setIsAnalyzing(false);
    switch (step) {
      case 'upload':
        setCurrentRoute('content-studio');
        break;
      case 'analyze':
        setIsAnalyzing(true);
        setCurrentRoute('content-studio');
        break;
      case 'clips':
        setCurrentRoute('ai-clip-studio');
        break;
      case 'edit':
        setCurrentRoute('ai-editor');
        break;
      case 'repurpose':
        setCurrentRoute('repurpose-studio');
        break;
    }
  };

  const handleStartWorkflow = (step?: WorkflowStep) => {
    if (step === 'analyze') {
      setIsAnalyzing(true);
      setCurrentRoute('content-studio');
    } else if (step === 'clips') {
      setIsAnalyzing(false);
      setCurrentRoute('ai-clip-studio');
    } else {
      setIsAnalyzing(false);
      setCurrentRoute('content-studio');
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentRoute('content-studio');
    showToast("Starting neural analysis on 'The Future of Software Development' (20:14)", "info");
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    setCurrentRoute('ai-clip-studio');
    showToast("AI synthesis completed! 5 viral clips curated.", "success");
  };

  const handleEditClip = (clip: Clip) => {
    setSelectedClip(clip);
    setIsAnalyzing(false);
    setCurrentRoute('ai-editor');
    showToast(`Loaded "${clip.title}" into Precision Editor`, 'info');
  };

  const handleSendToRepurpose = (clip?: Clip) => {
    if (clip) setSelectedClip(clip);
    setIsAnalyzing(false);
    setCurrentRoute('repurpose-studio');
    showToast("Loaded 1 video into 5 omni-platform micro formats", 'success');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser({ name: '', handle: '', email: '' });
    showToast("Signed out. Redirecting to Sign In...", "info");
  };

  const handleSignInSuccess = (userData: UserProfile) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentRoute('dashboard');
  };

  // 1st page is ALWAYS the Sign In page until the user signs in with their real name!
  if (!isAuthenticated) {
    return <SignInView onSignInSuccess={handleSignInSuccess} />;
  }

  return (
    <div className="flex h-screen w-screen bg-[#0a0c10] text-[#e2e8f0] overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentRoute={currentRoute} 
        onNavigate={(route) => {
          setIsAnalyzing(false);
          setCurrentRoute(route);
        }}
        onSignOut={handleSignOut}
        userName={user.name || 'Creator'}
        userHandle={user.handle || 'creator'}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <TopNav 
          onNewProject={() => {
            setIsAnalyzing(false);
            setCurrentRoute('content-studio');
            showToast("New Video Project: Upload or select a demo master file", "info");
          }}
          onSignOut={handleSignOut}
          userName={user.name || 'Creator'}
          userHandle={user.handle || 'creator'}
        />

        {/* Viewport Content with Scroll */}
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8 max-w-7xl w-full mx-auto">
          {/* Render Route / State */}
          {isAnalyzing ? (
            <AIAnalysisView 
              onComplete={handleAnalysisComplete}
              onCancel={() => {
                setIsAnalyzing(false);
                setCurrentRoute('content-studio');
                showToast("Analysis cancelled", "info");
              }}
              onSelectStep={handleSelectWorkflowStep}
            />
          ) : (
            <>
              {currentRoute === 'dashboard' && (
                <DashboardView 
                  userName={user.name}
                  onStartWorkflow={handleStartWorkflow} 
                  onNavigate={setCurrentRoute}
                />
              )}

              {currentRoute === 'content-studio' && (
                <ContentStudioView 
                  onStartAnalysis={handleStartAnalysis}
                  onSelectStep={handleSelectWorkflowStep}
                />
              )}

              {currentRoute === 'ai-clip-studio' && (
                <AIClipsView 
                  onEditClip={handleEditClip}
                  onSendToRepurpose={handleSendToRepurpose}
                  onSelectStep={handleSelectWorkflowStep}
                />
              )}

              {currentRoute === 'ai-editor' && (
                <AIEditorView 
                  clip={selectedClip}
                  onProceedToRepurpose={() => handleSendToRepurpose(selectedClip)}
                  onSelectStep={handleSelectWorkflowStep}
                />
              )}

              {currentRoute === 'repurpose-studio' && (
                <RepurposeStudioView 
                  clip={selectedClip}
                  onSelectStep={handleSelectWorkflowStep}
                />
              )}

              {currentRoute === 'script-generator' && (
                <ScriptGeneratorView />
              )}

              {currentRoute === 'asset-library' && (
                <AssetLibraryView />
              )}

              {currentRoute === 'analytics' && (
                <AnalyticsView />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
