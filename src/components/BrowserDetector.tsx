import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Cpu, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Monitor, 
  CheckCircle, 
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Server
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

// 定义检测结果类型
interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  kernel: string;
  userAgent: string;
}

interface SystemInfo {
  os: string;
  osVersion: string;
  platform: string;
}

interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop' | 'tv' | 'unknown';
  vendor: string;
  model: string;
  screenSize: string;
  viewport: string;
  pixelRatio: number;
}

interface FeatureSupport {
  html5: boolean;
  css3: boolean;
  webgl: boolean;
  webp: boolean;
  webrtc: boolean;
  serviceWorker: boolean;
  pushApi: boolean;
  darkMode: boolean;
}

const BrowserDetector: React.FC = () => {
  // 设置页面标题为中文
  useEffect(() => {
    document.title = "浏览器内核检测工具";
  }, []);

  const [browser, setBrowser] = useState<BrowserInfo>({
    name: '检测中...',
    version: '检测中...',
    engine: '检测中...',
    kernel: '检测中...',
    userAgent: navigator.userAgent,
  });
  
  const [system, setSystem] = useState<SystemInfo>({
    os: '检测中...',
    osVersion: '检测中...',
    platform: navigator.platform,
  });
  
  const [device, setDevice] = useState<DeviceInfo>({
    type: 'unknown',
    vendor: '检测中...',
    model: '检测中...',
    screenSize: '',
    viewport: '',
    pixelRatio: window.devicePixelRatio,
  });
  
  const [features, setFeatures] = useState<FeatureSupport>({
    html5: false,
    css3: false,
    webgl: false,
    webp: false,
    webrtc: false,
    serviceWorker: false,
    pushApi: false,
    darkMode: false,
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('browser');

  // 切换展开/收起状态
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // 重新检测
  const reDetect = () => {
    setIsLoading(true);
    setTimeout(() => {
      detectBrowser();
      detectSystem();
      detectDevice();
      detectFeatures();
      setIsLoading(false);
    }, 800);
  };

  // 检测浏览器信息
  const detectBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    let name = 'Unknown';
    let version = 'Unknown';
    let engine = 'Unknown';
    let kernel = 'Unknown';

    // 内核检测
    if (userAgent.includes('blink')) {
      kernel = 'Blink';
    } else if (userAgent.includes('webkit') && !userAgent.includes('blink')) {
      kernel = 'WebKit';
    } else if (userAgent.includes('gecko') && !userAgent.includes('webkit')) {
      kernel = 'Gecko';
    } else if (userAgent.includes('trident')) {
      kernel = 'Trident';
    } else if (userAgent.includes('presto')) {
      kernel = 'Presto';
    }

    // 渲染引擎检测
    if (userAgent.includes('edge') && userAgent.includes('chrome')) {
      engine = 'Blink';
    } else if (userAgent.includes('webkit') && !userAgent.includes('blink')) {
      engine = 'WebKit';
    } else if (userAgent.includes('gecko')) {
      engine = 'Gecko';
    } else if (userAgent.includes('trident')) {
      engine = 'Trident';
    }

    // 浏览器名称和版本检测
    if (userAgent.includes('chrome') && !userAgent.includes('edge')) {
      name = 'Chrome';
      version = userAgent.match(/chrome\/(\d+(\.\d+)?)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('edge')) {
      name = 'Microsoft Edge';
      version = userAgent.match(/edge\/(\d+(\.\d+)?)/)?.[1] || 
                userAgent.match(/edg\/(\d+(\.\d+)?)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('firefox')) {
      name = 'Firefox';
      version = userAgent.match(/firefox\/(\d+(\.\d+)?)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      name = 'Safari';
      version = userAgent.match(/version\/(\d+(\.\d+)?)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('opera') || userAgent.includes('opr')) {
      name = 'Opera';
      version = userAgent.match(/(opera|opr)\/(\d+(\.\d+)?)/)?.[2] || 'Unknown';
    } else if (userAgent.includes('msie') || userAgent.includes('trident')) {
      name = 'Internet Explorer';
      version = userAgent.match(/(msie |rv:)(\d+(\.\d+)?)/)?.[2] || 'Unknown';
    } else if (userAgent.includes('brave')) {
      name = 'Brave';
      version = userAgent.match(/brave\/(\d+(\.\d+)?)/)?.[1] || 'Unknown';
    }

    setBrowser({ name, version, engine, kernel, userAgent: navigator.userAgent });
  };

  // 检测系统信息（优化Windows版本识别）
  const detectSystem = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    let os = 'Unknown';
    let osVersion = 'Unknown';

    if (userAgent.includes('windows')) {
      os = 'Windows';
      // 基于NT版本号精准识别
      if (userAgent.includes('windows nt 10.0')) {
        osVersion = '10';
      } else if (userAgent.includes('windows nt 11.0')) {
        osVersion = '11';
      } else if (userAgent.includes('windows nt 6.3')) {
        osVersion = '8.1';
      } else if (userAgent.includes('windows nt 6.2')) {
        osVersion = '8';
      } else if (userAgent.includes('windows nt 6.1')) {
        osVersion = '7';
      } else if (userAgent.includes('windows nt 6.0')) {
        osVersion = 'Vista';
      } else if (userAgent.includes('windows nt 5.1')) {
        osVersion = 'XP';
      } else if (userAgent.includes('windows nt 5.0')) {
        osVersion = '2000';
      }
    } else if (userAgent.includes('macintosh') || userAgent.includes('mac os x')) {
      os = 'macOS';
      const match = userAgent.match(/mac os x (\d+(_\d+)*)/);
      if (match) {
        const versionStr = match[1].replace(/_/g, '.');
        const versions = {
          '10.15': '10.15 (Catalina)',
          '11': '11 (Big Sur)',
          '12': '12 (Monterey)',
          '13': '13 (Ventura)',
          '14': '14 (Sonoma)',
          '15': '15 (Sequoia)'
        };
        osVersion = versions[versionStr as keyof typeof versions] || versionStr;
      }
    } else if (userAgent.includes('linux')) {
      os = 'Linux';
      if (userAgent.includes('ubuntu')) {
        osVersion = `Ubuntu (${userAgent.match(/ubuntu\/(\d+\.\d+)/)?.[1] || ''})`;
      } else if (userAgent.includes('fedora')) {
        osVersion = 'Fedora';
      } else if (userAgent.includes('debian')) {
        osVersion = 'Debian';
      }
    } else if (userAgent.includes('android')) {
      os = 'Android';
      osVersion = userAgent.match(/android (\d+(\.\d+)?)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('ios') || userAgent.includes('iphone') || userAgent.includes('ipad')) {
      os = 'iOS';
      const match = userAgent.match(/os (\d+(_\d+)*) like mac os x/);
      osVersion = match?.[1]?.replace(/_/g, '.') || 'Unknown';
    }

    setSystem({ os, osVersion, platform: navigator.platform });
  };

  // 检测设备信息
  const detectDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    let type: DeviceInfo['type'] = 'unknown';
    let vendor = 'Unknown';
    let model = 'Unknown';

    // 设备类型检测
    if (/(android|iphone|ipod|blackberry|windows phone)/i.test(userAgent)) {
      type = 'mobile';
    } else if (/(ipad|tablet|playbook|silk)/i.test(userAgent) || 
               (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && window.innerWidth > 768)) {
      type = 'tablet';
    } else if (/(smart-tv|tv|sonydtv)/i.test(userAgent)) {
      type = 'tv';
    } else {
      type = 'desktop';
    }

    // 设备厂商和型号识别
    if (userAgent.includes('windows nt')) {
      vendor = 'PC';
      model = '台式机';
    } else if (userAgent.includes('macintosh')) {
      vendor = 'Apple';
      model = 'Mac';
    } else if (userAgent.includes('iphone')) {
      vendor = 'Apple';
      model = 'iPhone';
    } else if (userAgent.includes('ipad')) {
      vendor = 'Apple';
      model = 'iPad';
    } else if (userAgent.includes('android')) {
      if (userAgent.includes('samsung')) {
        vendor = 'Samsung';
        model = 'Galaxy 系列';
      } else if (userAgent.includes('huawei')) {
        vendor = '华为';
        model = '手机';
      } else if (userAgent.includes('xiaomi')) {
        vendor = '小米';
        model = '手机';
      } else if (userAgent.includes('oppo')) {
        vendor = 'OPPO';
        model = '手机';
      } else if (userAgent.includes('vivo')) {
        vendor = 'vivo';
        model = '手机';
      }
    }

    // 屏幕信息
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    const viewport = `${window.innerWidth}x${window.innerHeight}`;
    const pixelRatio = window.devicePixelRatio;

    setDevice({ type, vendor, model, screenSize, viewport, pixelRatio });
  };

  // 检测浏览器特性支持
  const detectFeatures = () => {
    // HTML5 支持检测
    const html5 = !!window.FileReader && !!window.FormData && !!window.history.pushState;

    // CSS3 支持检测
    const css3 = typeof document.createElement('div').style.borderRadius !== 'undefined';

    // WebGL 支持检测
    const webgl = !!window.WebGLRenderingContext;

    // WebP 支持检测
    const webpPromise: Promise<boolean> = new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img.width === 1);
      img.onerror = () => resolve(false);
      img.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
    });

    // WebRTC 支持检测
    const webrtc = !!window.RTCPeerConnection;

    // Service Worker 支持检测
    const serviceWorker = 'serviceWorker' in navigator;

    // Push API 支持检测
    const pushApi = 'PushManager' in window;

    // 暗色模式检测
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 处理WebP检测结果
    webpPromise.then(webpSupport => {
      setFeatures({
        html5,
        css3,
        webgl,
        webp: webpSupport,
        webrtc,
        serviceWorker,
        pushApi,
        darkMode,
      });
    });
  };

  // 初始化检测
  useEffect(() => {
    detectBrowser();
    detectSystem();
    detectDevice();
    detectFeatures();

    // 监听窗口大小变化
    const handleResize = () => {
      setDevice(prev => ({
        ...prev,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        pixelRatio: window.devicePixelRatio,
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 获取设备图标
  const getDeviceIcon = () => {
    switch (device.type) {
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'tablet':
        return <Tablet className="h-5 w-5" />;
      case 'desktop':
        return <Laptop className="h-5 w-5" />;
      case 'tv':
        return <Monitor className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  // 获取特性状态徽章
  const getFeatureBadge = (supported: boolean) => {
    if (supported) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" /> 支持
        </Badge>
      );
    }
    return (
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
        <AlertTriangle className="h-3 w-3 mr-1" /> 不支持
      </Badge>
    );
  };

  return (
    // 使用flex布局确保页脚贴合底部
    <div className="min-h-screen  flex flex-col">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold">浏览器内核检测工具</h1>
          </div>
          <Button 
            onClick={reDetect}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                检测中...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                重新检测
              </>
            )}
          </Button>
        </div>
      </header>

      {/* 主内容区：使用flex-1占据剩余空间 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 设备概览卡片 */}
        <Card className="mb-8 overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-md">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  {getDeviceIcon()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {device.vendor} {device.model}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {device.type === 'mobile' ? '移动设备' : 
                     device.type === 'tablet' ? '平板设备' : 
                     device.type === 'desktop' ? '桌面设备' : '未知设备'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                  <Server className="h-3 w-3 mr-1" /> {system.os} {system.osVersion}
                </Badge>
                <Badge className="bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                  <Cpu className="h-3 w-3 mr-1" /> {browser.kernel} 内核
                </Badge>
                <Badge className="bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                  像素比: {device.pixelRatio}x
                </Badge>
              </div>
            </div>

            {/* 检测结果标签页（已改为中文） */}
            <Tabs defaultValue="browser" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 bg-slate-100 dark:bg-slate-700/50">
                <TabsTrigger value="browser" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                  浏览器信息
                </TabsTrigger>
                <TabsTrigger value="system" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                  系统设备
                </TabsTrigger>
                <TabsTrigger value="features" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                  特性支持
                </TabsTrigger>
              </TabsList>

              {/* 浏览器信息标签页 */}
              <TabsContent value="browser" className="space-y-4">
                <div 
                  className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
                  onClick={() => toggleSection('browser')}
                >
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 flex justify-between items-center cursor-pointer">
                    <h3 className="font-semibold text-lg">浏览器核心信息</h3>
                    {expandedSection === 'browser' ? 
                      <ChevronUp className="h-5 w-5 text-slate-500" /> : 
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    }
                  </div>
                  {expandedSection === 'browser' && (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">浏览器名称</p>
                        <p className="font-medium">{browser.name}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">版本号</p>
                        <p className="font-medium">{browser.version}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">渲染引擎</p>
                        <p className="font-medium">{browser.engine}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">内核类型</p>
                        <p className="font-medium">{browser.kernel}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 flex justify-between items-center cursor-pointer"
                       onClick={() => toggleSection('useragent')}>
                    <h3 className="font-semibold text-lg">User Agent 信息</h3>
                    {expandedSection === 'useragent' ? 
                      <ChevronUp className="h-5 w-5 text-slate-500" /> : 
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    }
                  </div>
                  {expandedSection === 'useragent' && (
                    <div className="p-4">
                      <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-md text-sm font-mono overflow-x-auto">
                        {browser.userAgent}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* 系统设备标签页 */}
              <TabsContent value="system" className="space-y-4">
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 flex justify-between items-center cursor-pointer"
                       onClick={() => toggleSection('systemInfo')}>
                    <h3 className="font-semibold text-lg">系统信息</h3>
                    {expandedSection === 'systemInfo' ? 
                      <ChevronUp className="h-5 w-5 text-slate-500" /> : 
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    }
                  </div>
                  {expandedSection === 'systemInfo' && (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">操作系统</p>
                        <p className="font-medium">{system.os} {system.osVersion}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">平台类型</p>
                        <p className="font-medium">{system.platform}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">设备厂商</p>
                        <p className="font-medium">{device.vendor}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">设备型号</p>
                        <p className="font-medium">{device.model}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 flex justify-between items-center cursor-pointer"
                       onClick={() => toggleSection('display')}>
                    <h3 className="font-semibold text-lg">显示信息</h3>
                    {expandedSection === 'display' ? 
                      <ChevronUp className="h-5 w-5 text-slate-500" /> : 
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    }
                  </div>
                  {expandedSection === 'display' && (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">屏幕分辨率</p>
                        <p className="font-medium">{device.screenSize}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">视口大小</p>
                        <p className="font-medium">{device.viewport}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">设备像素比</p>
                        <p className="font-medium">{device.pixelRatio}x</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">设备类型</p>
                        <p className="font-medium">
                          {device.type === 'mobile' ? '移动设备' : 
                           device.type === 'tablet' ? '平板设备' : 
                           device.type === 'desktop' ? '桌面设备' : 
                           device.type === 'tv' ? '电视设备' : '未知设备'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* 特性支持标签页（完整显示所有8项特性） */}
              <TabsContent value="features" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 1. HTML5 支持 */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex justify-between items-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-blue-500" />
                            <span>HTML5 支持</span>
                          </div>
                          {getFeatureBadge(features.html5)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>检测是否支持 FileReader、FormData、History API 等 HTML5 核心特性</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* 2. CSS3 支持 */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex justify-between items-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-blue-500" />
                            <span>CSS3 支持</span>
                          </div>
                          {getFeatureBadge(features.css3)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>检测是否支持 border-radius 等 CSS3 核心特性</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* 3. WebGL 支持 */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex justify-between items-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-blue-500" />
                            <span>WebGL 支持</span>
                          </div>
                          {getFeatureBadge(features.webgl)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>检测是否支持 WebGL 3D 图形渲染</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* 4. WebP 图片支持 */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex justify-between items-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-blue-500" />
                            <span>WebP 图片支持</span>
                          </div>
                          {getFeatureBadge(features.webp)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>检测是否支持 WebP 高效图片格式</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* 5. WebRTC 支持 */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex justify-between items-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-blue-500" />
                            <span>WebRTC 支持</span>
                          </div>
                          {getFeatureBadge(features.webrtc)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>检测是否支持实时通信技术</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* 6. Service Worker 支持 */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex justify-between items-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-blue-500" />
                            <span>Service Worker 支持</span>
                          </div>
                          {getFeatureBadge(features.serviceWorker)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>检测是否支持离线缓存和后台同步</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* 7. Push API 支持 */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex justify-between items-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-blue-500" />
                            <span>Push API 支持</span>
                          </div>
                          {getFeatureBadge(features.pushApi)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>检测是否支持 Web 推送通知</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* 8. 暗色模式 */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex justify-between items-center bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-blue-500" />
                            <span>暗色模式</span>
                          </div>
                          {getFeatureBadge(features.darkMode)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>检测系统是否启用暗色模式</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        {/* 检测说明 */}
        <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-md">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">检测说明</h3>
            <div className="prose dark:prose-invert max-w-none">
              <p>本工具通过分析浏览器 User-Agent 字符串和检测浏览器 API 支持情况，识别以下信息：</p>
              <ul>
                <li>浏览器名称、版本、渲染引擎和内核类型</li>
                <li>操作系统类型和版本</li>
                <li>设备类型（移动/平板/桌面）、厂商和型号</li>
                <li>屏幕分辨率、视口大小和像素比</li>
                <li>HTML5、CSS3 等现代 Web 特性支持情况</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-4">
                注意：检测结果基于浏览器提供的信息，部分隐私保护浏览器可能会隐藏或修改相关信息，导致检测结果不准确。
              </p>
            </div>
          </div>
        </Card>
      </main>

      {/* 页脚：通过margin-top:auto确保在底部 */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>浏览器内核检测工具 © {new Date().getFullYear()}</p>
          <p className="mt-1">采用 React + TypeScript 开发，支持全设备适配</p>
        </div>
      </footer>
    </div>
  );
};

export default BrowserDetector;