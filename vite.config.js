import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// 图片压缩
// import viteImagemin from 'vite-plugin-imagemin'
import { VitePWA } from 'vite-plugin-pwa';
// Gzip压缩
import viteCompression from 'vite-plugin-compression';
/**
 * @type {import('vite').UserConfig}
 */
// vue3配置mock
// import { viteMockServe } from "vite-plugin-mock";
export default defineConfig({
    build: {
	    sourcemap: false,// App，小程序端源码调试，需要开启
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,// 生产环境移除console
			},
		},
    },
	// resolve:{
	// 	alias:{
			
	// 	}
	// },
    plugins: [  
	    uni({
			template: {
				compilerOptions: {
					// isCustomElement: tag => tag === 'wx-open-launch-weapp'
					isCustomElement: tag =>tag.startsWith('wx-open-launch-')
				}
			}
	    }),
		viteCompression(),
		// viteImagemin({
		// 	gifsicle: {
		// 	  optimizationLevel: 7,
		// 	  interlaced: false
		// 	},
		// 	optipng: {
		// 	  optimizationLevel: 7
		// 	},
		// 	mozjpeg: {
		// 	  quality: 20
		// 	},
		// 	pngquant: {
		// 	  quality: [0.8, 0.9],
		// 	  speed: 4
		// 	},
		// 	svgo: {
		// 	  plugins: [
		// 		{
		// 		  name: 'removeViewBox'
		// 		},
		// 		{
		// 		  name: 'removeEmptyAttrs',
		// 		  active: false
		// 		}
		// 	  ]
		// 	}
		// })
		VitePWA({
		    registerType: 'autoUpdate',
			// devOptions: { //dev环境下生成 service worker
			// 	enabled: true
			// },
			manifest: { 
				name: '树蚁医疗',
				short_name: 'ShoYii',
				description: '树蚁医疗是个好东西',
				theme_color: '#F3F3F3',//Web App的主题色
				icons: [
				  { 
					src: '/static/h5/pwa/192.png',
					sizes: '192x192',
					type: 'image/png'
				  },
				  {
					src: '/static/h5/pwa/512.png',
					sizes: '512x512',
					type: 'image/png'
				  }
				],
				 display: "standalone",// Web App 从主屏幕点击启动后的显示类型,fullscreen,standalone
				 // 当用户从设备的主屏幕点击图标进入时，出现的第一个画面。如果设置为空字符串，则会以manifest.js的地址做为URL
				 start_url: "/"
				 // background_color:'#002140'//用来设置Web App启动画面的背景颜色。
			},
		    workbox: {
		      skipWaiting: true,
		      clientsClaim: true,
			  // 预缓存清单
			  globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff,eot,ttf,svg}'], //默认会缓存css,js和html资源
			  runtimeCaching:[
				  {
				    urlPattern: /^https:\/\/doctor\.shoyii\.com\/.*/i,
				    handler: 'NetworkFirst',
				    options: {
				      cacheName: 'jsdelivr-images-cache',
					  // 有的时候缓存会变动，有点资源变动后以后都用不着了，得清除出去，所以可以设置过期时间。
				      expiration: {
				        maxEntries: 30,//最多缓存数
				        maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
				      },
				      cacheableResponse: {// 不透明响应 
				        statuses: [0, 200],
				      },
				    },
				  },
			  ]
		    }
		}),
		// viteMockServe({
		//     supportTs: false
		// })
    ],
	 // #ifdef H5
	server: {  
		proxy : {
			"/proxy-hostpital" : {
				target : "https://shoyii-open-1258143571.cos.ap-guangzhou.myqcloud.com", //请求转发给谁
				changeOrigin : true, //控制服务器收到的请求头中Host的值,默认值是false，如果是false，请求头还是8080，而不是微信的http
				secure : false,
				rewrite : (path) => path.replace(/^\/proxy-hostpital/, '')  
			},
			"/proxy-ju" : {
				target : "http://apis.juhe.cn", //请求转发给谁
				changeOrigin : true, //控制服务器收到的请求头中Host的值,默认值是false，如果是false，请求头还是8080，而不是微信的http
				secure : false,
				rewrite : (path) => path.replace(/^\/proxy-ju/, '')  
			}
		}
		// open: true, // 是否在浏览器打开
		// port: 8088, // 端口号
		// host: 'local.xxx.com'
	}
	// #endif
});
