import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
// https://astro.build/config
export default defineConfig({
  // redirects:{
  //   '/index': '/id-ID/',
  // },
  output: 'server',
  adapter: cloudflare(),
});