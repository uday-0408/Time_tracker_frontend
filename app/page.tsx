'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const CATEGORIES = ['Python', 'SQL', 'Datasetu', 'Break', 'TT'];

interface RunningEntry {
  _id: string;
  category: string;
  startTime: string;
}

interface TodayData {
  totals: Record<string, number>;
  runningEntry: RunningEntry | null;
}

export default function Home() {
  const [todayData, setTodayData] = useState<TodayData>({
    totals: { Python: 0, SQL: 0, Datasetu: 0, Break: 0, TT: 0 },
    runningEntry: null,
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTodayData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/track/today`);
      const data = await response.json();
      if (data.success) {
        setTodayData(data);
      }
    } catch (error) {
      console.error('Error fetching today data:', error);
    }
  };

  useEffect(() => {
    fetchTodayData();
    const interval = setInterval(fetchTodayData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (todayData.runningEntry) {
      const timer = setInterval(() => {
        const start = new Date(todayData.runningEntry!.startTime).getTime();
        const now = Date.now();
        setElapsedTime(Math.floor((now - start) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setElapsedTime(0);
    }
  }, [todayData.runningEntry]);

  const handleStartCategory = async (category: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/track/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      });
      const data = await response.json();
      if (data.success) {
        await fetchTodayData();
      }
    } catch (error) {
      console.error('Error starting tracking:', error);
    }
    setLoading(false);
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/track/stop`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        await fetchTodayData();
      }
    } catch (error) {
      console.error('Error stopping tracking:', error);
    }
    setLoading(false);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8">Internship Time Tracker</h1>

        {/* Current Running Task */}
        <Card>
          <CardHeader>
            <CardTitle>Current Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {todayData.runningEntry ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{todayData.runningEntry.category}</p>
                  <p className="text-4xl font-mono mt-2">{formatTime(elapsedTime)}</p>
                </div>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={handleStop}
                  disabled={loading}
                >
                  Stop
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground text-lg">No activity running. Click a category to start.</p>
            )}
          </CardContent>
        </Card>

        {/* Category Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Start Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  size="lg"
                  variant={todayData.runningEntry?.category === category ? 'default' : 'outline'}
                  onClick={() => {
                    if (todayData.runningEntry?.category === category) {
                      handleStop();
                    } else {
                      handleStartCategory(category);
                    }
                  }}
                  disabled={loading}
                  className="h-20 text-lg"
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Totals */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Totals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {CATEGORIES.map((category) => {
                const seconds = todayData.totals[category] || 0;
                const displaySeconds = 
                  todayData.runningEntry?.category === category 
                    ? seconds + elapsedTime 
                    : seconds;
                
                return (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-lg font-medium">{category}</span>
                    <span className="text-xl font-mono">{formatTime(displaySeconds)}</span>
                  </div>
                );
              })}
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-mono font-bold">
                    {formatTime(
                      Object.values(todayData.totals).reduce((a, b) => a + b, 0) +
                        (todayData.runningEntry ? elapsedTime : 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
