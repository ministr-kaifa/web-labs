# HTTP HTTPS и их параметры 
## Лабораторная работа №1
## Зубков В. В. АСБ-3-036


### rgups.ru

```shell   
$ curl https://rgups.ru -Iv

Trying 80.72.224.90:443...  #логи курла
* Connected to rgups.ru (80.72.224.90) port 443 (#0)  
* schannel: disabled automatic use of client certificate  
* ALPN: offers http/1.1  
* ALPN: server accepted http/1.1  
* using HTTP/1.1
> HEAD / HTTP/1.1   # метод - хед(только заголовок), энд поинт запроса(путь до ресурса на хосте), версия протокола
> Host: rgups.ru    # домен хоста
> User-Agent: curl/8.0.1    # юзер агент(информация о устройстве и приложении клиента)
> Accept: */*   # тип принимаемых данных

HTTP/1.1 200 OK     # версия протокола, статус код(200 - все нормально), расшифровка кода запроса
Server: nginx/1.19.1    # приложение получившее запрос
Date: Tue, 17 Oct 2023 10:10:33 GMT # дата
Content-Type: text/html; charset=utf-8  # формат данных респонса
Connection: keep-alive  # дальнейшая судьба tcp-сессии (keep-alive дословно оставить живой)
X-Powered-By: ProcessWire CMS # X- - префикс для кастомных атрибутов, платформа приложения сервера
Set-Cookie: wire=; path=/; HttpOnly; SameSite=Lax # ключ для куков на сервере, корень юрл откуда будут доступны куки, куки существуют только в пределах http сессии(скрипты документа доступа к ним не имеют), скоуп куков(действуют только на rgups.ru/*)
Expires: Thu, 19 Nov 1981 08:52:00 GMT  # когда кеш респонса протухнет, находится тут для обратной совместимости
Cache-Control: no-store, no-cache, must-revalidate  # кэширование респонса: не кешировать, кэш нужно валидировать(head запросом) перед каждым использованием, кэш может быть использованным пока актуален(используется аттрибут max-age, но его нету)
Pragma: no-cache    # не кешировать запрос, находится тут для обратной совместимости

<
* Connection #0 to host rgups.ru left intact
```


### github.com


```shell
$ curl https://github.com/ --head
# далее буду описывать только атрибуты которых не было ранее

Content-Type: text/html; charset=utf-8 # формат, кодировка
Vary: X-PJAX, X-PJAX-Container, Turbo-Visit, Turbo-Frame, Accept-Language, Accept-Encoding, Accept, X-Requested-With   # какие из заголовков можно использовать для определения того, допустимый ли у них в кэше лежит контент
content-language: en-US    # локаль
ETag: W/"a85beb97066b347b28296d4faa1a833c" # "версия кеша ресурса" для его валидации
Strict-Transport-Security: max-age=31536000; includeSubdomains; preload # HSTS - сайт должен быть доступен только по https следующие max-age секунд, как и поддомены сайта, сайт использует статический HSTS(в браузере заранее указаны такие сайты)
X-Frame-Options: deny   # запрет на вывод сайта в окошке, нужно для защиты от атак click jacking
X-Content-Type-Options: nosniff # отключение функции автоопределения mime типа браузером
X-XSS-Protection: 0 # Отключает защиту от XSS браузера
Referrer-Policy: origin-when-cross-origin, strict-origin-when-cross-origin # степень детализации атрибута referer при переходе на другой сайт
Content-Security-Policy:    # хосты к которым можно подключиться с этой страницы
Accept-Ranges: bytes    # поддержка запроса по частям
X-GitHub-Request-Id:   # атрибут имеющий отношение только к гитхабу, айди запроса для логирования или баг трекинга
```


### rzd.ru


```shell
$ curl https://www.rzd.ru --head --header "User-Agent: Mozilla/5.0"

Content-Length: 205986  # размер ответа
X-UCM-Pod-Name:     # встречается только на сайтах ржд
Via: nginx2 # информация о прокси
```

### ya.ru
```shell
PS ~> curl "https://ya.ru/" --head `
  -H "cookie: куки из моего браузера" `
  -H "user-agent: юзер агент из моего бразуера"

Accept-CH: # список атрибутов которые должны(не обязательно) быть включены в последующих запросах клиента
Last-Modified: Tue, 17 Oct 2023 13:22:52 GMT    # дата последнего изменения запрашиваемого ресурса
Link: <юрл>;  rel="preload"; as="script"; crossorigin="anonymous";   # подключение внешних ресурсов
NEL: {"report_to": "network-errors", "max_age": 100, "success_fraction": 0.001, "failure_fraction": 0.1}    # логирование ошибок браузером
P3P: policyref="/w3c/p3p.xml", CP="NON DSP ADM DEV PSD IVDo OUR IND STP PHY PRE NAV UNI"    # что-то что уже давно деприкейтед
Report-To: { "group": "network-errors", "max_age": 100, "endpoints": [{"url": "https://dr.yandex.net/nel", "priority": 1}, {"url": "https://dr2.yandex.net/nel", "priority": 2}]} # эндпоинты логирования
Reporting-Endpoints: default="https://ya.ru/portal/front/reports/?..."  # для логирования браузером не критических вещей
```


### python.org


```shell
$ curl https://www.python.org --head

Age: 3341   # секунд ответ был в кеше
X-Served-By: cache-iad-kiad7000025-IAD, cache-bma1680-BMA   # этот и следующие атрибуты нужны для географически распределенного кеширования(cdn)
X-Cache: HIT, HIT 
X-Cache-Hits: 11, 8 
X-Timer: S1697549525.694268,VS0,VE0   
```


### git-scm.com 


```shell
$ curl https://git-scm.com --head

X-Download-Options: noopen  # for Internet Explorer from version 8
X-Permitted-Cross-Domain-Policies: none # запрет междоменных запросов с помощью Flash
```


### jetbrains.com


```shell
$ curl https://www.jetbrains.com --head

Alt-Svc: h3=":443"; ma=86400    # сервер поддерживает http3
X-Cache: Hit from cloudfront    # этот и последующие атрибуты имеют отношение к cdn и aws
X-Amz-Cf-Pop: FRA56-P2
X-Amz-Cf-Id:
```



### code.visualstudio.com

```shell
$ curl https://code.visualstudio.com --head

X-Powered-By: ASP.NET   # 🤯
x-azure-ref:   # характерно для azure(🤯)
```