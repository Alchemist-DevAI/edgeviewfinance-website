import React, { useState, useEffect } from 'react';
import type { UptimeCheck } from '../utils/uptime-monitor';

interface MonitoringStats {
  uptime: number;
  avgResponseTime: number;
  totalChecks: number;
  lastCheck?: UptimeCheck;
}

interface ErrorLog {
  timestamp: string;
  level: 'error' | 'warning' | 'info';
  message: string;
  source: string;
}

const MonitoringDashboard: React.FC = () => {
  const [stats, setStats] = useState<MonitoringStats>({
    uptime: 0,
    avgResponseTime: 0,
    totalChecks: 0
  });
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load uptime statistics
    const loadUptimeStats = () => {
      if (typeof window !== 'undefined' && window.uptimeMonitor) {
        const uptimeStats = window.uptimeMonitor.getStats();
        setStats(uptimeStats);
      }
    };

    // Load error logs from localStorage
    const loadErrorLogs = () => {
      if (typeof window !== 'undefined') {
        const storedErrors = localStorage.getItem('monitoring_errors');
        if (storedErrors) {
          setErrors(JSON.parse(storedErrors));
        }
      }
    };

    // Initial load
    loadUptimeStats();
    loadErrorLogs();
    setIsLoading(false);

    // Update every 30 seconds
    const interval = setInterval(() => {
      loadUptimeStats();
      loadErrorLogs();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (uptime: number): string => {
    if (uptime >= 99.9) return '🟢 Excellent';
    if (uptime >= 99.0) return '🟡 Good';
    if (uptime >= 95.0) return '🟠 Fair';
    return '🔴 Poor';
  };

  const formatResponseTime = (time: number): string => {
    if (time < 500) return '🟢 Fast';
    if (time < 1000) return '🟡 Moderate';
    if (time < 2000) return '🟠 Slow';
    return '🔴 Very Slow';
  };

  const clearErrorLogs = () => {
    localStorage.removeItem('monitoring_errors');
    setErrors([]);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Website Monitoring Dashboard</h2>
        <p className="text-blue-100">Real-time monitoring for www.edgeviewfinance.com.au</p>
      </div>

      {/* Statistics Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Uptime Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-green-800">Uptime</h3>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.uptime.toFixed(2)}%
            </div>
            <div className="text-sm text-green-700">
              {formatUptime(stats.uptime)}
            </div>
            <div className="text-xs text-green-600 mt-2">
              Based on {stats.totalChecks} checks
            </div>
          </div>

          {/* Response Time Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-blue-800">Response Time</h3>
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {Math.round(stats.avgResponseTime)}ms
            </div>
            <div className="text-sm text-blue-700">
              {formatResponseTime(stats.avgResponseTime)}
            </div>
            <div className="text-xs text-blue-600 mt-2">
              Average response time
            </div>
          </div>

          {/* Error Count Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-orange-800">Errors</h3>
              <span className="text-2xl">🚨</span>
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {errors.length}
            </div>
            <div className="text-sm text-orange-700">
              Recent errors logged
            </div>
            {errors.length > 0 && (
              <button
                onClick={clearErrorLogs}
                className="text-xs text-orange-600 hover:text-orange-800 mt-2 underline"
              >
                Clear error log
              </button>
            )}
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Current Status</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-700">Website is online</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Monitoring active</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Sentry tracking enabled</span>
            </div>
          </div>
        </div>

        {/* Recent Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">Recent Errors</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {errors.slice(-5).reverse().map((error, index) => (
                <div key={index} className="bg-white rounded p-3 border border-red-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      error.level === 'error' ? 'bg-red-100 text-red-800' :
                      error.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {error.level.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(error.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-800 font-medium mb-1">
                    {error.message}
                  </div>
                  <div className="text-xs text-gray-600">
                    Source: {error.source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monitoring Tools */}
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Monitoring Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded p-3 border">
              <div className="font-medium text-gray-800 mb-1">🔍 Sentry Error Tracking</div>
              <div className="text-sm text-gray-600">
                Real-time error monitoring and performance tracking
              </div>
            </div>
            <div className="bg-white rounded p-3 border">
              <div className="font-medium text-gray-800 mb-1">⏱️ Uptime Monitoring</div>
              <div className="text-sm text-gray-600">
                Checks every 5 minutes with email alerts
              </div>
            </div>
            <div className="bg-white rounded p-3 border">
              <div className="font-medium text-gray-800 mb-1">🌏 Google Search Console</div>
              <div className="text-sm text-gray-600">
                International targeting for Australia
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-blue-50 rounded-lg p-4 mt-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => window.open('https://sentry.io/', '_blank')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
            >
              View Sentry Dashboard
            </button>
            <button
              onClick={() => window.open('https://search.google.com/search-console', '_blank')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
            >
              Open Search Console
            </button>
            <button
              onClick={() => window.open('https://vercel.com/dashboard', '_blank')}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-sm"
            >
              Vercel Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;