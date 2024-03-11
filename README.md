Bu modül, DDoS saldırılarını atlatmak için kullanılır. 
    Cloudscraper ve request modülleri kullanılarak oluşturulmuştur.

    Fonksiyonlar:
    - encode(string): String'i base64 formatına kodlar.
    - bypass(proxy, uagent, callback, force, cookie): 
      DDoS saldırı korumasını atlamak için kullanılır. 
      Gerekli parametreler: proxy (proxy adresi), uagent (user-agent bilgisi), 
      callback (geri çağırma fonksiyonu), force (zorlama, boolean değer), cookie (çerezler).

    Bu modül, ddos-guard.net üzerindeki firewall'ı atlamak için geliştirilmiştir.
