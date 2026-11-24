/**
 * Insav · Rex / Forward 模块（ForwardWidget 格式）
 * 数据来自 insav.tv 的站内接口（主站 / 无码 / 4K 三个分站）。
 * 只收录站点标注为免费（private=0）的视频；会员专享片不显示、也不取播放地址。
 * 封面经 Cloudflare Worker hghub-ins 解码后显示。
 */
WidgetMetadata = {
  id: "hghub.insav",
  title: "Insav",
  description: "Insav（insav.tv）免费放送（主站 / 无码 / 4K）+ MissAV（missav.ws）分类与搜索，在线播放（18+）",
  author: "nico123-code",
  site: "https://github.com/nico123-code/hghub-plugins",
  version: "2026.11.24.3",
  requiredVersion: "0.0.2",
  detailCacheDuration: 300,
  modules: [
    { id: "ins_free_1", title: "免费·主站", functionName: "loadFree1", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "ins_free_2", title: "免费·无码", functionName: "loadFree2", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "ins_free_4", title: "免费·4K", functionName: "loadFree4", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    {
      id: "mav_list",
      title: "MissAV",
      functionName: "loadMav",
      cacheDuration: 300,
      params: [
        {
          name: "cat",
          title: "分类",
          type: "enumeration",
          value: "new",
          enumOptions: [
            { title: "最近更新", value: "new" },
            { title: "新作上市", value: "release" },
            { title: "中文字幕", value: "chinese-subtitle" },
            { title: "无码流出", value: "uncensored-leak" },
            { title: "今日热门", value: "today-hot" },
            { title: "本周热门", value: "weekly-hot" },
            { title: "本月热门", value: "monthly-hot" },
          ],
        },
        { name: "page", title: "页码", type: "page" },
      ],
    },
    {
      id: "loadResource",
      title: "加载资源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: [],
    },
  ],
  search: {
    title: "搜索",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input", description: "番号 / 标题 / 女优（Insav 只显示免费片）" },
      {
        name: "site",
        title: "站点",
        type: "enumeration",
        value: "all",
        enumOptions: [
          { title: "全部（Insav + MissAV）", value: "all" },
          { title: "Insav", value: "ins" },
          { title: "MissAV", value: "mav" },
        ],
      },
      { name: "page", title: "页码", type: "page" },
    ],
  },
};

var CryptoJS=function(){var t={};return t.CryptoJS=function(){var t=t||function(t,e){var r;if("undefined"!=typeof window&&window.crypto&&(r=window.crypto),"undefined"!=typeof self&&self.crypto&&(r=self.crypto),"undefined"!=typeof globalThis&&globalThis.crypto&&(r=globalThis.crypto),!r&&"undefined"!=typeof window&&window.msCrypto&&(r=window.msCrypto),!r&&"undefined"!=typeof global&&global.crypto&&(r=global.crypto),!r&&"function"==typeof require)try{r=require("crypto")}catch(t){}var n=function(){if(r){if("function"==typeof r.getRandomValues)try{return r.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof r.randomBytes)try{return r.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},i=Object.create||function(){function t(){}return function(e){var r;return t.prototype=e,r=new t,t.prototype=null,r}}(),o={},c=o.lib={},s=c.Base={extend:function(t){var e=i(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},a=c.WordArray=s.extend({init:function(t,r){t=this.words=t||[],this.sigBytes=r!=e?r:4*t.length},toString:function(t){return(t||h).stringify(this)},concat:function(t){var e=this.words,r=t.words,n=this.sigBytes,i=t.sigBytes;if(this.clamp(),n%4)for(var o=0;o<i;o++){var c=r[o>>>2]>>>24-o%4*8&255;e[n+o>>>2]|=c<<24-(n+o)%4*8}else for(var s=0;s<i;s+=4)e[n+s>>>2]=r[s>>>2];return this.sigBytes+=i,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=s.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],r=0;r<t;r+=4)e.push(n());return new a.init(e,t)}}),f=o.enc={},h=f.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],i=0;i<r;i++){var o=e[i>>>2]>>>24-i%4*8&255;n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n+=2)r[n>>>3]|=parseInt(t.substr(n,2),16)<<24-n%8*4;return new a.init(r,e/2)}},u=f.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],i=0;i<r;i++){var o=e[i>>>2]>>>24-i%4*8&255;n.push(String.fromCharCode(o))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n++)r[n>>>2]|=(255&t.charCodeAt(n))<<24-n%4*8;return new a.init(r,e)}},p=f.Utf8={stringify:function(t){try{return decodeURIComponent(escape(u.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return u.parse(unescape(encodeURIComponent(t)))}},d=c.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=p.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r,n=this._data,i=n.words,o=n.sigBytes,c=this.blockSize,s=o/(4*c),f=(s=e?t.ceil(s):t.max((0|s)-this._minBufferSize,0))*c,h=t.min(4*f,o);if(f){for(var u=0;u<f;u+=c)this._doProcessBlock(i,u);r=i.splice(0,f),n.sigBytes-=h}return new a.init(r,h)},clone:function(){var t=s.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),l=(c.Hasher=d.extend({cfg:s.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new l.HMAC.init(t,r).finalize(e)}}}),o.algo={});return o}(Math);return t}(),function(t){(function(){var e=t,r=e.lib.WordArray;function n(t,e,n){for(var i=[],o=0,c=0;c<e;c++)if(c%4){var s=n[t.charCodeAt(c-1)]<<c%4*2|n[t.charCodeAt(c)]>>>6-c%4*2;i[o>>>2]|=s<<24-o%4*8,o++}return r.create(i,o)}e.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,n=this._map;t.clamp();for(var i=[],o=0;o<r;o+=3)for(var c=(e[o>>>2]>>>24-o%4*8&255)<<16|(e[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|e[o+2>>>2]>>>24-(o+2)%4*8&255,s=0;s<4&&o+.75*s<r;s++)i.push(n.charAt(c>>>6*(3-s)&63));var a=n.charAt(64);if(a)for(;i.length%4;)i.push(a);return i.join("")},parse:function(t){var e=t.length,r=this._map,i=this._reverseMap;if(!i){i=this._reverseMap=[];for(var o=0;o<r.length;o++)i[r.charCodeAt(o)]=o}var c=r.charAt(64);if(c){var s=t.indexOf(c);-1!==s&&(e=s)}return n(t,e,i)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})(),t.enc.Base64}(t.CryptoJS),function(t){(function(e){var r=t,n=r.lib,i=n.WordArray,o=n.Hasher,c=r.algo,s=[];!function(){for(var t=0;t<64;t++)s[t]=4294967296*e.abs(e.sin(t+1))|0}();var a=c.MD5=o.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,e){for(var r=0;r<16;r++){var n=e+r,i=t[n];t[n]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)}var o=this._hash.words,c=t[e+0],a=t[e+1],d=t[e+2],l=t[e+3],y=t[e+4],_=t[e+5],v=t[e+6],g=t[e+7],B=t[e+8],m=t[e+9],k=t[e+10],S=t[e+11],w=t[e+12],x=t[e+13],C=t[e+14],z=t[e+15],b=o[0],E=o[1],M=o[2],D=o[3];b=f(b,E,M,D,c,7,s[0]),D=f(D,b,E,M,a,12,s[1]),M=f(M,D,b,E,d,17,s[2]),E=f(E,M,D,b,l,22,s[3]),b=f(b,E,M,D,y,7,s[4]),D=f(D,b,E,M,_,12,s[5]),M=f(M,D,b,E,v,17,s[6]),E=f(E,M,D,b,g,22,s[7]),b=f(b,E,M,D,B,7,s[8]),D=f(D,b,E,M,m,12,s[9]),M=f(M,D,b,E,k,17,s[10]),E=f(E,M,D,b,S,22,s[11]),b=f(b,E,M,D,w,7,s[12]),D=f(D,b,E,M,x,12,s[13]),M=f(M,D,b,E,C,17,s[14]),b=h(b,E=f(E,M,D,b,z,22,s[15]),M,D,a,5,s[16]),D=h(D,b,E,M,v,9,s[17]),M=h(M,D,b,E,S,14,s[18]),E=h(E,M,D,b,c,20,s[19]),b=h(b,E,M,D,_,5,s[20]),D=h(D,b,E,M,k,9,s[21]),M=h(M,D,b,E,z,14,s[22]),E=h(E,M,D,b,y,20,s[23]),b=h(b,E,M,D,m,5,s[24]),D=h(D,b,E,M,C,9,s[25]),M=h(M,D,b,E,l,14,s[26]),E=h(E,M,D,b,B,20,s[27]),b=h(b,E,M,D,x,5,s[28]),D=h(D,b,E,M,d,9,s[29]),M=h(M,D,b,E,g,14,s[30]),b=u(b,E=h(E,M,D,b,w,20,s[31]),M,D,_,4,s[32]),D=u(D,b,E,M,B,11,s[33]),M=u(M,D,b,E,S,16,s[34]),E=u(E,M,D,b,C,23,s[35]),b=u(b,E,M,D,a,4,s[36]),D=u(D,b,E,M,y,11,s[37]),M=u(M,D,b,E,g,16,s[38]),E=u(E,M,D,b,k,23,s[39]),b=u(b,E,M,D,x,4,s[40]),D=u(D,b,E,M,c,11,s[41]),M=u(M,D,b,E,l,16,s[42]),E=u(E,M,D,b,v,23,s[43]),b=u(b,E,M,D,m,4,s[44]),D=u(D,b,E,M,w,11,s[45]),M=u(M,D,b,E,z,16,s[46]),b=p(b,E=u(E,M,D,b,d,23,s[47]),M,D,c,6,s[48]),D=p(D,b,E,M,g,10,s[49]),M=p(M,D,b,E,C,15,s[50]),E=p(E,M,D,b,_,21,s[51]),b=p(b,E,M,D,w,6,s[52]),D=p(D,b,E,M,l,10,s[53]),M=p(M,D,b,E,k,15,s[54]),E=p(E,M,D,b,a,21,s[55]),b=p(b,E,M,D,B,6,s[56]),D=p(D,b,E,M,z,10,s[57]),M=p(M,D,b,E,v,15,s[58]),E=p(E,M,D,b,x,21,s[59]),b=p(b,E,M,D,y,6,s[60]),D=p(D,b,E,M,S,10,s[61]),M=p(M,D,b,E,d,15,s[62]),E=p(E,M,D,b,m,21,s[63]),o[0]=o[0]+b|0,o[1]=o[1]+E|0,o[2]=o[2]+M|0,o[3]=o[3]+D|0},_doFinalize:function(){var t=this._data,r=t.words,n=8*this._nDataBytes,i=8*t.sigBytes;r[i>>>5]|=128<<24-i%32;var o=e.floor(n/4294967296),c=n;r[15+(i+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),r[14+(i+64>>>9<<4)]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8),t.sigBytes=4*(r.length+1),this._process();for(var s=this._hash,a=s.words,f=0;f<4;f++){var h=a[f];a[f]=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8)}return s},clone:function(){var t=o.clone.call(this);return t._hash=this._hash.clone(),t}});function f(t,e,r,n,i,o,c){var s=t+(e&r|~e&n)+i+c;return(s<<o|s>>>32-o)+e}function h(t,e,r,n,i,o,c){var s=t+(e&n|r&~n)+i+c;return(s<<o|s>>>32-o)+e}function u(t,e,r,n,i,o,c){var s=t+(e^r^n)+i+c;return(s<<o|s>>>32-o)+e}function p(t,e,r,n,i,o,c){var s=t+(r^(e|~n))+i+c;return(s<<o|s>>>32-o)+e}r.MD5=o._createHelper(a),r.HmacMD5=o._createHmacHelper(a)})(Math),t.MD5}(t.CryptoJS),function(t){t.lib.Cipher||function(e){var r=t,n=r.lib,i=n.Base,o=n.WordArray,c=n.BufferedBlockAlgorithm,s=r.enc,a=(s.Utf8,s.Base64),f=r.algo.EvpKDF,h=n.Cipher=c.extend({cfg:i.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){c.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function t(t){return"string"==typeof t?B:v}return function(e){return{encrypt:function(r,n,i){return t(n).encrypt(e,r,n,i)},decrypt:function(r,n,i){return t(n).decrypt(e,r,n,i)}}}}()}),u=(n.StreamCipher=h.extend({_doFinalize:function(){return this._process(!0)},blockSize:1}),r.mode={}),p=n.BlockCipherMode=i.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),d=u.CBC=function(){var t=p.extend();function r(t,r,n){var i,o=this._iv;o?(i=o,this._iv=e):i=this._prevBlock;for(var c=0;c<n;c++)t[r+c]^=i[c]}return t.Encryptor=t.extend({processBlock:function(t,e){var n=this._cipher,i=n.blockSize;r.call(this,t,e,i),n.encryptBlock(t,e),this._prevBlock=t.slice(e,e+i)}}),t.Decryptor=t.extend({processBlock:function(t,e){var n=this._cipher,i=n.blockSize,o=t.slice(e,e+i);n.decryptBlock(t,e),r.call(this,t,e,i),this._prevBlock=o}}),t}(),l=(r.pad={}).Pkcs7={pad:function(t,e){for(var r=4*e,n=r-t.sigBytes%r,i=n<<24|n<<16|n<<8|n,c=[],s=0;s<n;s+=4)c.push(i);var a=o.create(c,n);t.concat(a)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},y=(n.BlockCipher=h.extend({cfg:h.cfg.extend({mode:d,padding:l}),reset:function(){var t;h.reset.call(this);var e=this.cfg,r=e.iv,n=e.mode;this._xformMode==this._ENC_XFORM_MODE?t=n.createEncryptor:(t=n.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,r&&r.words):(this._mode=t.call(n,this,r&&r.words),this._mode.__creator=t)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t,e=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(e.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),e.unpad(t)),t},blockSize:4}),n.CipherParams=i.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),_=(r.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext,r=t.salt;return(r?o.create([1398893684,1701076831]).concat(r).concat(e):e).toString(a)},parse:function(t){var e,r=a.parse(t),n=r.words;return 1398893684==n[0]&&1701076831==n[1]&&(e=o.create(n.slice(2,4)),n.splice(0,4),r.sigBytes-=16),y.create({ciphertext:r,salt:e})}},v=n.SerializableCipher=i.extend({cfg:i.extend({format:_}),encrypt:function(t,e,r,n){n=this.cfg.extend(n);var i=t.createEncryptor(r,n),o=i.finalize(e),c=i.cfg;return y.create({ciphertext:o,key:r,iv:c.iv,algorithm:t,mode:c.mode,padding:c.padding,blockSize:t.blockSize,formatter:n.format})},decrypt:function(t,e,r,n){return n=this.cfg.extend(n),e=this._parse(e,n.format),t.createDecryptor(r,n).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),g=(r.kdf={}).OpenSSL={execute:function(t,e,r,n,i){if(n||(n=o.random(8)),i)c=f.create({keySize:e+r,hasher:i}).compute(t,n);else var c=f.create({keySize:e+r}).compute(t,n);var s=o.create(c.words.slice(e),4*r);return c.sigBytes=4*e,y.create({key:c,iv:s,salt:n})}},B=n.PasswordBasedCipher=v.extend({cfg:v.cfg.extend({kdf:g}),encrypt:function(t,e,r,n){var i=(n=this.cfg.extend(n)).kdf.execute(r,t.keySize,t.ivSize,n.salt,n.hasher);n.iv=i.iv;var o=v.encrypt.call(this,t,e,i.key,n);return o.mixIn(i),o},decrypt:function(t,e,r,n){n=this.cfg.extend(n),e=this._parse(e,n.format);var i=n.kdf.execute(r,t.keySize,t.ivSize,e.salt,n.hasher);return n.iv=i.iv,v.decrypt.call(this,t,e,i.key,n)}})}()}(t.CryptoJS),function(t){(function(){var e=t,r=e.lib.BlockCipher,n=e.algo,i=[],o=[],c=[],s=[],a=[],f=[],h=[],u=[],p=[],d=[];!function(){for(var t=[],e=0;e<256;e++)t[e]=e<128?e<<1:e<<1^283;var r=0,n=0;for(e=0;e<256;e++){var l=n^n<<1^n<<2^n<<3^n<<4;l=l>>>8^255&l^99,i[r]=l,o[l]=r;var y=t[r],_=t[y],v=t[_],g=257*t[l]^16843008*l;c[r]=g<<24|g>>>8,s[r]=g<<16|g>>>16,a[r]=g<<8|g>>>24,f[r]=g,g=16843009*v^65537*_^257*y^16843008*r,h[l]=g<<24|g>>>8,u[l]=g<<16|g>>>16,p[l]=g<<8|g>>>24,d[l]=g,r?(r=y^t[t[t[v^y]]],n^=t[t[n]]):r=n=1}}();var l=[0,1,2,4,8,16,32,64,128,27,54],y=n.AES=r.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var t=this._keyPriorReset=this._key,e=t.words,r=t.sigBytes/4,n=4*((this._nRounds=r+6)+1),o=this._keySchedule=[],c=0;c<n;c++)c<r?o[c]=e[c]:(f=o[c-1],c%r?r>6&&c%r==4&&(f=i[f>>>24]<<24|i[f>>>16&255]<<16|i[f>>>8&255]<<8|i[255&f]):(f=i[(f=f<<8|f>>>24)>>>24]<<24|i[f>>>16&255]<<16|i[f>>>8&255]<<8|i[255&f],f^=l[c/r|0]<<24),o[c]=o[c-r]^f);for(var s=this._invKeySchedule=[],a=0;a<n;a++){if(c=n-a,a%4)var f=o[c];else f=o[c-4];s[a]=a<4||c<=4?f:h[i[f>>>24]]^u[i[f>>>16&255]]^p[i[f>>>8&255]]^d[i[255&f]]}}},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,c,s,a,f,i)},decryptBlock:function(t,e){var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,h,u,p,d,o),r=t[e+1],t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,n,i,o,c,s){for(var a=this._nRounds,f=t[e]^r[0],h=t[e+1]^r[1],u=t[e+2]^r[2],p=t[e+3]^r[3],d=4,l=1;l<a;l++){var y=n[f>>>24]^i[h>>>16&255]^o[u>>>8&255]^c[255&p]^r[d++],_=n[h>>>24]^i[u>>>16&255]^o[p>>>8&255]^c[255&f]^r[d++],v=n[u>>>24]^i[p>>>16&255]^o[f>>>8&255]^c[255&h]^r[d++],g=n[p>>>24]^i[f>>>16&255]^o[h>>>8&255]^c[255&u]^r[d++];f=y,h=_,u=v,p=g}y=(s[f>>>24]<<24|s[h>>>16&255]<<16|s[u>>>8&255]<<8|s[255&p])^r[d++],_=(s[h>>>24]<<24|s[u>>>16&255]<<16|s[p>>>8&255]<<8|s[255&f])^r[d++],v=(s[u>>>24]<<24|s[p>>>16&255]<<16|s[f>>>8&255]<<8|s[255&h])^r[d++],g=(s[p>>>24]<<24|s[f>>>16&255]<<16|s[h>>>8&255]<<8|s[255&u])^r[d++],t[e]=y,t[e+1]=_,t[e+2]=v,t[e+3]=g},keySize:8});e.AES=r._createHelper(y)})(),t.AES}(t.CryptoJS),function(t){t.pad.Pkcs7}(t.CryptoJS),function(t){var e;t.mode.ECB=((e=t.lib.BlockCipherMode.extend()).Encryptor=e.extend({processBlock:function(t,e){this._cipher.encryptBlock(t,e)}}),e.Decryptor=e.extend({processBlock:function(t,e){this._cipher.decryptBlock(t,e)}}),e),t.mode.ECB}(t.CryptoJS),t.CryptoJS}();

var INS_API = "https://insav.tv/api/";
var INS_COVER = "https://hghub-ins.hghub-zhang.workers.dev/?p=";
var INS_SITES = { "1": "主站", "2": "无码", "4": "4K" };
var INS_KEY = CryptoJS.enc.Utf8.parse("0XxdjmI55ZjjqQLO3nI7gGqrBP0Vz9jS");
var INS_IV = "RWf23muavY";
var INS_SIGN = "NRkw0g3iJLDvw5tJ5PuVt5276z0SOuyL";
var INS_SUF = "NWSdef";

function insIv(s) { return CryptoJS.enc.Utf8.parse(INS_IV + (s || INS_SUF)); }
function insEnc(t) {
  return CryptoJS.AES.encrypt(t, INS_KEY, { iv: insIv(INS_SUF), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
}
function insDec(t, suf) {
  return CryptoJS.AES.decrypt(t, INS_KEY, { iv: insIv(suf), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);
}
function insSign(o) {
  var ks = Object.keys(o).sort(), s = "";
  for (var i = 0; i < ks.length; i++) s += ks[i] + "=" + o[ks[i]] + "&";
  return CryptoJS.MD5(s + INS_SIGN).toString();
}

async function insApi(path, body, site) {
  var c = { site: Number(site) || 1, device: 1, timestamp: Date.now() };
  for (var k in body) c[k] = body[k];
  c.encode_sign = insSign(c);
  var res = await Widget.http.post(INS_API + path, JSON.stringify({ "post-data": insEnc(JSON.stringify(c)) }), {
    headers: {
      "Content-Type": "application/json",
      suffix: INS_SUF,
      lang: "zh",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    },
  });
  var j = res && res.data;
  if (typeof j === "string") { try { j = JSON.parse(j); } catch (e) { throw new Error("Insav 接口返回异常"); } }
  if (!j || typeof j.data !== "string") throw new Error("Insav 接口无数据（HTTP " + (res && res.statusCode) + "）");
  var d = JSON.parse(insDec(j.data, j.suffix));
  if (d.code !== 1) throw new Error("Insav：" + (d.msg || "请求失败"));
  return d.data;
}

function insPage(p) { var n = parseInt((p && p.page) || "1", 10); return n > 0 ? n : 1; }

function insCover(p, size) {
  if (!p) return "";
  return INS_COVER + encodeURIComponent(p) + "&s=" + (size || "600x600");
}

function insTitle(v) {
  var t = String(v.title || "").replace(/\d{4}-\d{2}-\d{2}-\d+$/, "").trim();
  if (v.mash && t.toUpperCase().indexOf(String(v.mash).toUpperCase()) < 0) t = v.mash + " " + t;
  return t;
}

function insItem(v, site) {
  if (!v || v.private !== 0) return null; // 只要免费片
  var link = "ins:" + site + ":" + v.id;
  var actor = v.actor && v.actor.name ? v.actor.name : "";
  var it = {
    id: link,
    type: "url",
    title: insTitle(v),
    mediaType: "movie",
    link: link,
    description: [INS_SITES[site], actor].filter(Boolean).join(" · "),
  };
  var c = insCover(v.thumb || v.preview);
  if (c) { it.posterPath = c; it.coverUrl = c; it.backdropPath = insCover(v.preview || v.thumb, "1200x807"); }
  if (v.publish_date) it.releaseDate = String(v.publish_date);
  if (actor) it.genreTitle = actor;
  return it;
}

async function insList(site, body) {
  var d = await insApi("video/lists", body, site);
  if (d && d.last_page && body.page > d.last_page) return [];
  var rows = (d && d.data) || [];
  var out = [];
  for (var i = 0; i < rows.length; i++) { var it = insItem(rows[i], site); if (it) out.push(it); }
  return out;
}

async function loadFree(params) {
  params = params || {};
  var site = INS_SITES[params.site] ? params.site : "1";
  return insList(site, { page: insPage(params), limit: 30, type: "3" });
}
async function loadFree1(p) { return loadFree({ site: "1", page: p && p.page }); }
async function loadFree2(p) { return loadFree({ site: "2", page: p && p.page }); }
async function loadFree4(p) { return loadFree({ site: "4", page: p && p.page }); }

async function search(params) {
  params = params || {};
  var kw = String(params.keyword || params.query || "").trim();
  if (!kw) return [];
  var page = insPage(params);
  var site = params.site || "all";
  var jobs = [];
  if (site === "all" || site === "ins") jobs = ["1", "2", "4"].map(function (s) {
    return insList(s, { page: page, limit: 30, keyword: kw }).catch(function () { return []; });
  });
  if (site === "all" || site === "mav") jobs.push(mavSearch(kw, page).catch(function (e) {
    if (site === "mav") throw e;
    return [];
  }));
  var rs = await Promise.all(jobs);
  return [].concat.apply([], rs);
}

function insRef(link) {
  var m = /^ins:([124]):(\d+)/.exec(String(link || ""));
  return m ? { site: m[1], vid: Number(m[2]) } : null;
}

async function insPlay(ref) {
  var info = await insApi("video/info", { vid: ref.vid }, ref.site);
  if (!info || info.private !== 0) throw new Error("这部是会员专享片，模块只支持免费片");
  var url = await insApi("video/getVideoUrl", { vid: ref.vid }, ref.site);
  if (typeof url !== "string" || !/^https?:\/\//.test(url)) throw new Error("没拿到播放地址");
  return { info: info, url: url };
}

async function loadDetail(link) {
  if (/^mav:/.test(String(link || ""))) return (await mavDetail(String(link).slice(4))).item;
  var ref = insRef(link);
  if (!ref) return null;
  var info = await insApi("video/info", { vid: ref.vid }, ref.site);
  var item = insItem(info, ref.site);
  if (!item) throw new Error("这部是会员专享片，模块只支持免费片");
  if (info.description) item.description = String(info.description);
  if (Array.isArray(info.tags) && info.tags.length) item.genreTitle = info.tags.slice(0, 3).map(function (t) { return t.name; }).join(" / ");
  if (info.actor && info.actor.name) item.peoples = [{ id: "actor-" + info.actor.id, title: info.actor.name, role: "女优" }];
  try {
    var url = await insApi("video/getVideoUrl", { vid: ref.vid }, ref.site);
    if (typeof url === "string" && /^https?:\/\//.test(url)) { item.videoUrl = url; item.playerType = "app"; }
  } catch (e) { console.log("[Insav] 预取播放地址失败:", e && e.message); }
  return item;
}

async function loadResource(params) {
  params = params || {};
  var lk = String(params.link || params.id || "");
  if (/^mav:/.test(lk)) {
    var d = await mavDetail(lk.slice(4));
    if (!d.playlist) throw new Error("MissAV：没找到播放地址");
    return [{ name: "MissAV", description: "HLS", url: d.playlist, customHeaders: mavHeaders(), playerType: "app" }];
  }
  var ref = insRef(lk);
  if (!ref) return [];
  var r = await insPlay(ref);
  return [{ name: "Insav " + INS_SITES[ref.site], description: "HLS", url: r.url, playerType: "app" }];
}

// ===================== MissAV（missav.ws）=====================
// 站点有 Cloudflare：若手机网络被要求“验证您是真人”，这里的请求会失败。
// missav.ws 若被 Cloudflare 拦，自动换官方镜像 missav.fans / missav.media（同一站点）
var MAV_ORIGINS = ["https://missav.ws", "https://missav.fans", "https://missav.media"];
var MAV_ORIGIN = MAV_ORIGINS[0];
var MAV_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
var MAV_CATS = [
  ["new", "最近更新"], ["release", "新作上市"], ["chinese-subtitle", "中文字幕"], ["uncensored-leak", "无码流出"],
  ["today-hot", "今日热门"], ["weekly-hot", "本周热门"], ["monthly-hot", "本月热门"],
];
var MAV_UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

async function mavGetOne(origin, path) {
  var res = await Widget.http.get(origin + path, {
    headers: { "User-Agent": MAV_UA, Referer: origin + "/", "Accept-Language": "zh-CN,zh;q=0.9" },
  });
  var html = res && res.data;
  if (typeof html !== "string") html = html == null ? "" : String(html);
  if (/<title>\s*(Just a moment|请稍候|請稍候)/i.test(html) || (/challenge-platform/.test(html) && html.length < 20000))
    throw new Error("Cloudflare 验证");
  if (res && res.statusCode >= 400) throw new Error("HTTP " + res.statusCode);
  if (html.length < 2000) throw new Error("页面为空");
  return html;
}

async function mavGet(path) {
  var order = [MAV_ORIGIN].concat(MAV_ORIGINS.filter(function (o) { return o !== MAV_ORIGIN; }));
  var last;
  for (var i = 0; i < order.length; i++) {
    try {
      var html = await mavGetOne(order[i], path);
      MAV_ORIGIN = order[i];
      return html;
    } catch (e) { last = e; }
  }
  throw new Error("MissAV 打不开（" + (last && last.message || "未知错误") + "）");
}

function mavText(s) {
  return String(s || "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

var MAV_SKIP = /^(new|release|chinese-subtitle|uncensored-leak|english-subtitle|today-hot|weekly-hot|monthly-hot|genres?|actresses|makers?|labels?|series|search|tags?|vr|siro|luxu|gana|maan|scute|ara|fc2|heyzo|tokyohot|1pondo|caribbeancom|caribbeancompr|10musume|pacopacomama|gachinco|xxxav|marriedslash|naughty4610|naughty0930|madou|twav|furuke|saved|vip|login|register|playlists?|settings|account|contact|dmca|terms|upload|klive|clive)$/i;

function mavSlugFromHref(href) {
  var m = /^(?:https?:\/\/[^/]+)?\/(?:dm\d+\/)?(?:cn|zh|en|ja|ko|tw)\/([^/?#"']+)\/?(?:[?#].*)?$/i.exec(String(href || ""));
  if (!m) return "";
  var slug = decodeURIComponent(m[1]).toLowerCase();
  if (MAV_SKIP.test(slug) || !/\d/.test(slug)) return "";
  return slug;
}

function mavItem(slug, title, cover, dur) {
  var link = "mav:" + slug;
  var it = {
    id: link, type: "url", title: title || slug.toUpperCase(), mediaType: "movie", link: link,
    description: "MissAV",
  };
  var c = cover || "https://fourhoi.com/" + slug.replace(/-(chinese-subtitle|uncensored-leak|english-subtitle)$/, "") + "/cover-t.jpg";
  it.posterPath = c; it.coverUrl = c; it.backdropPath = c.replace(/cover-t\.jpg$/, "cover-n.jpg");
  if (dur) it.durationText = dur;
  return it;
}

function mavParseList(html) {
  var out = [], seen = {};
  var blocks = html.split(/<div[^>]+class="[^"]*\bthumbnail\b/);
  for (var i = 1; i < blocks.length; i++) {
    var b = blocks[i];
    var hrefs = b.match(/href="([^"]+)"/g) || [];
    var slug = "";
    for (var h = 0; h < hrefs.length && !slug; h++) slug = mavSlugFromHref(hrefs[h].slice(6, -1));
    if (!slug || seen[slug]) continue;
    seen[slug] = 1;
    var cover = (/(?:data-src|src)="(https?:\/\/[^"]*(?:fourhoi|surrit|nineyu)[^"]*\.(?:jpe?g|webp|png))"/i.exec(b) || [])[1] || "";
    var title = "";
    var ta = /<a[^>]+class="[^"]*text-secondary[^"]*"[^>]*>([\s\S]*?)<\/a>/i.exec(b);
    if (ta) title = mavText(ta[1]);
    if (!title) { var alt = /<img[^>]+alt="([^"]{6,})"/i.exec(b); if (alt) title = mavText(alt[1]); }
    var dur = (/>\s*(\d{1,2}:\d{2}:\d{2}|\d{1,2}:\d{2})\s*</.exec(b) || [])[1] || "";
    out.push(mavItem(slug, title, cover, dur));
  }
  if (!out.length) { // 结构变了时的兜底：只按链接取
    var re = /href="([^"]+)"/g, m;
    while ((m = re.exec(html))) {
      var s = mavSlugFromHref(m[1]);
      if (s && !seen[s]) { seen[s] = 1; out.push(mavItem(s, "", "", "")); }
    }
  }
  return out;
}

function mavUnpack(code) {
  // 标准 eval(function(p,a,c,k,e,d){...}('p',a,c,'k'.split('|'))) 解包
  var m = /\}\('((?:[^'\\]|\\.)*)',\s*(\d+),\s*(\d+),\s*'((?:[^'\\]|\\.)*)'\.split\('\|'\)/.exec(code);
  if (!m) return "";
  var p = m[1].replace(/\\'/g, "'"), a = +m[2], c = +m[3], k = m[4].split("|");
  function e(n) { return (n < a ? "" : e(parseInt(n / a, 10))) + ((n = n % a) > 35 ? String.fromCharCode(n + 29) : n.toString(36)); }
  var dict = {};
  while (c--) dict[e(c)] = k[c] || e(c);
  return p.replace(/\b\w+\b/g, function (w) { return dict[w] != null ? dict[w] : w; });
}

function mavPlaylist(html) {
  var raw = String(html).replace(/\\\//g, "/").replace(/\\u002f/gi, "/");
  var direct = /https?:\/\/(?:surrit|nineyu|fourhoi)\.(?:com|store)\/[0-9a-f-]{36}\/playlist\.m3u8/i.exec(raw);
  if (direct) return direct[0];
  var tok = /m3u8\|([a-f0-9|]+)\|com\|(surrit|nineyu|fourhoi)\|https/i.exec(raw);
  if (tok) {
    var u = tok[1].split("|").reverse().join("-");
    if (MAV_UUID.test(u)) return "https://" + tok[2] + ".com/" + u + "/playlist.m3u8";
  }
  var ev = raw.indexOf("eval(function(p,a,c,k,e,d)");
  while (ev >= 0) {
    var un = mavUnpack(raw.slice(ev, ev + 20000));
    var d2 = /https?:\/\/[^"'\s;]+\.m3u8/i.exec(un);
    if (d2) return d2[0];
    ev = raw.indexOf("eval(function(p,a,c,k,e,d)", ev + 10);
  }
  var cdn = /((?:surrit|nineyu|fourhoi)\.(?:com|store))\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\//i.exec(raw);
  if (cdn) return "https://" + cdn[1] + "/" + cdn[2] + "/playlist.m3u8";
  return "";
}

function mavMeta(html, prop) {
  var re = new RegExp('<meta[^>]+(?:property|name)="' + prop + '"[^>]+content="([^"]*)"', "i");
  var m = re.exec(html);
  if (!m) { re = new RegExp('<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="' + prop + '"', "i"); m = re.exec(html); }
  return m ? mavText(m[1]) : "";
}

function mavField(html, labels) {
  for (var i = 0; i < labels.length; i++) {
    var re = new RegExp("<span>\\s*" + labels[i] + "\\s*[:：]?\\s*</span>([\\s\\S]{0,800}?)</div>", "i");
    var m = re.exec(html);
    if (m) {
      var names = [], r2 = /<a[^>]*>([\s\S]*?)<\/a>/g, a;
      while ((a = r2.exec(m[1]))) { var t = mavText(a[1]); if (t) names.push(t); }
      if (names.length) return names;
      var t2 = mavText(m[1]); if (t2) return [t2];
    }
  }
  return [];
}

function mavHeaders() {
  return { "User-Agent": MAV_UA, Referer: MAV_ORIGIN + "/", Origin: MAV_ORIGIN };
}

async function loadMav(params) {
  params = params || {};
  var cat = String(params.cat || "new");
  var ok = MAV_CATS.some(function (c) { return c[0] === cat; });
  if (!ok) cat = "new";
  var page = insPage(params);
  return mavParseList(await mavGet("/cn/" + cat + (page > 1 ? "?page=" + page : "")));
}

async function mavSearch(kw, page) {
  return mavParseList(await mavGet("/cn/search/" + encodeURIComponent(kw) + (page > 1 ? "?page=" + page : "")));
}

async function mavDetail(slug) {
  var html = await mavGet("/cn/" + encodeURIComponent(slug));
  var title = mavMeta(html, "og:title") || mavText((/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html) || [])[1]);
  title = title.replace(/\s*-\s*MissAV.*$/i, "");
  var it = mavItem(slug, title, mavMeta(html, "og:image"), "");
  var desc = mavMeta(html, "og:description") || mavMeta(html, "description");
  var actors = mavField(html, ["女优", "女優", "Actress"]);
  var genres = mavField(html, ["类型", "類型", "Genre"]);
  var date = mavField(html, ["发行日期", "發行日期", "Release date"]);
  it.description = desc || "MissAV";
  if (genres.length) it.genreTitle = genres.slice(0, 3).join(" / ");
  if (date.length && /^\d{4}-\d{2}-\d{2}/.test(date[0])) it.releaseDate = date[0].slice(0, 10);
  if (actors.length) it.peoples = actors.map(function (n, i) { return { id: "mav-actor-" + i, title: n, role: "女优" }; });
  var pl = mavPlaylist(html);
  if (pl) { it.videoUrl = pl; it.playerType = "app"; it.customHeaders = mavHeaders(); }
  return { item: it, playlist: pl };
}
