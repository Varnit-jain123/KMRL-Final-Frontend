import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface VoiceSearchProps {
  onVoiceResult: (transcript: string) => void;
  isListening?: boolean;
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export const VoiceSearch = ({ onVoiceResult, isListening = false }: VoiceSearchProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsRecording(true);
        toast({
          title: "Voice Search Started",
          description: "Speak your search query...",
        });
      };

      recognitionInstance.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        
        // If final result, trigger search
        if (event.results[event.results.length - 1].isFinal) {
          onVoiceResult(currentTranscript);
          toast({
            title: "Voice Search Complete",
            description: `Searching for: "${currentTranscript}"`,
          });
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or use text search",
          variant: "destructive"
        });
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognitionInstance;
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, [onVoiceResult, toast]);

  const handleVoiceSearch = () => {
    if (!isSupported) {
      // Fallback for unsupported browsers - use demo transcript
      const demoQueries = [
        "Show me safety documents from last month",
        "Find Metro project timeline",
        "Search for budget allocation reports",
        "Show urgent documents"
      ];
      const randomQuery = demoQueries[Math.floor(Math.random() * demoQueries.length)];
      onVoiceResult(randomQuery);
      toast({
        title: "Demo Voice Search",
        description: `Searching for: "${randomQuery}"`,
      });
      return;
    }

    if (!isRecording && recognitionRef.current) {
      try {
        setTranscript("");
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast({
          title: "Voice Search Error",
          description: "Unable to start voice recognition",
          variant: "destructive"
        });
      }
    } else if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={isRecording ? "destructive" : "outline"}
        size="sm"
        onClick={handleVoiceSearch}
        className={`flex items-center space-x-2 ${isRecording ? 'animate-pulse' : ''}`}
      >
        {isRecording ? (
          <>
            <MicOff className="h-4 w-4" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <Mic className="h-4 w-4" />
            <span>Voice Search</span>
          </>
        )}
      </Button>

      {/* Live transcript display */}
      {isRecording && transcript && (
        <div className="flex items-center space-x-1">
          <Badge variant="outline" className="text-xs max-w-32 truncate">
            "{transcript}"
          </Badge>
        </div>
      )}

      {/* Unsupported browser message */}
      {!isSupported && (
        <span className="text-xs text-muted-foreground">
          Voice search not supported in this browser
        </span>
      )}
    </div>
  );
};