/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism-twilight&languages=markup+css+clike+javascript+ada+apacheconf+bash+batch+c+csharp+cpp+coffeescript+css-extras+dart+django+dns-zone-file+docker+elixir+etlua+erlang+git+go+graphql+groovy+haml+handlebars+haskell+http+hpkp+hsts+ini+java+javadoc+javadoclike+jsdoc+js-extras+json+json5+jsonp+julia+kotlin+latex+less+lisp+lua+markup-templating+matlab+nginx+objectivec+perl+php+phpdoc+php-extras+powershell+promql+protobuf+puppet+purescript+python+r+jsx+tsx+regex+rest+ruby+rust+sass+scss+shell-session+sql+stylus+swift+toml+twig+typescript+typoscript+verilog+vhdl+vim+visual-basic+wasm+xml-doc+yaml&plugins=line-highlight+line-numbers+show-language+toolbar */
var _self =
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof WorkerGlobalScope &&
                self instanceof WorkerGlobalScope
              ? self
              : {},
    Prism = (function (u) {
        var c = /\blang(?:uage)?-([\w-]+)\b/i,
            n = 0,
            _ = {
                manual: u.Prism && u.Prism.manual,
                disableWorkerMessageHandler:
                    u.Prism && u.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(n) {
                        return n instanceof M
                            ? new M(n.type, e(n.content), n.alias)
                            : Array.isArray(n)
                              ? n.map(e)
                              : n
                                    .replace(/&/g, '&amp;')
                                    .replace(/</g, '&lt;')
                                    .replace(/\u00a0/g, ' ')
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function (e) {
                        return (
                            e.__id ||
                                Object.defineProperty(e, '__id', {
                                    value: ++n,
                                }),
                            e.__id
                        )
                    },
                    clone: function t(e, r) {
                        var a, n
                        switch (((r = r || {}), _.util.type(e))) {
                            case 'Object':
                                if (((n = _.util.objId(e)), r[n])) return r[n]
                                for (var i in ((a = {}), (r[n] = a), e))
                                    e.hasOwnProperty(i) && (a[i] = t(e[i], r))
                                return a
                            case 'Array':
                                return (
                                    (n = _.util.objId(e)),
                                    r[n]
                                        ? r[n]
                                        : ((a = []),
                                          (r[n] = a),
                                          e.forEach(function (e, n) {
                                              a[n] = t(e, r)
                                          }),
                                          a)
                                )
                            default:
                                return e
                        }
                    },
                    getLanguage: function (e) {
                        for (; e && !c.test(e.className); ) e = e.parentElement
                        return e
                            ? (e.className.match(c) || [
                                  ,
                                  'none',
                              ])[1].toLowerCase()
                            : 'none'
                    },
                    currentScript: function () {
                        if ('undefined' == typeof document) return null
                        if ('currentScript' in document)
                            return document.currentScript
                        try {
                            throw new Error()
                        } catch (e) {
                            var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(
                                e.stack
                            ) || [])[1]
                            if (n) {
                                var t = document.getElementsByTagName('script')
                                for (var r in t) if (t[r].src == n) return t[r]
                            }
                            return null
                        }
                    },
                    isActive: function (e, n, t) {
                        for (var r = 'no-' + n; e; ) {
                            var a = e.classList
                            if (a.contains(n)) return !0
                            if (a.contains(r)) return !1
                            e = e.parentElement
                        }
                        return !!t
                    },
                },
                languages: {
                    extend: function (e, n) {
                        var t = _.util.clone(_.languages[e])
                        for (var r in n) t[r] = n[r]
                        return t
                    },
                    insertBefore: function (t, e, n, r) {
                        var a = (r = r || _.languages)[t],
                            i = {}
                        for (var l in a)
                            if (a.hasOwnProperty(l)) {
                                if (l == e)
                                    for (var o in n)
                                        n.hasOwnProperty(o) && (i[o] = n[o])
                                n.hasOwnProperty(l) || (i[l] = a[l])
                            }
                        var s = r[t]
                        return (
                            (r[t] = i),
                            _.languages.DFS(_.languages, function (e, n) {
                                n === s && e != t && (this[e] = i)
                            }),
                            i
                        )
                    },
                    DFS: function e(n, t, r, a) {
                        a = a || {}
                        var i = _.util.objId
                        for (var l in n)
                            if (n.hasOwnProperty(l)) {
                                t.call(n, l, n[l], r || l)
                                var o = n[l],
                                    s = _.util.type(o)
                                'Object' !== s || a[i(o)]
                                    ? 'Array' !== s ||
                                      a[i(o)] ||
                                      ((a[i(o)] = !0), e(o, t, l, a))
                                    : ((a[i(o)] = !0), e(o, t, null, a))
                            }
                    },
                },
                plugins: {},
                highlightAll: function (e, n) {
                    _.highlightAllUnder(document, e, n)
                },
                highlightAllUnder: function (e, n, t) {
                    var r = {
                        callback: t,
                        container: e,
                        selector:
                            'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
                    }
                    _.hooks.run('before-highlightall', r),
                        (r.elements = Array.prototype.slice.apply(
                            r.container.querySelectorAll(r.selector)
                        )),
                        _.hooks.run('before-all-elements-highlight', r)
                    for (var a, i = 0; (a = r.elements[i++]); )
                        _.highlightElement(a, !0 === n, r.callback)
                },
                highlightElement: function (e, n, t) {
                    var r = _.util.getLanguage(e),
                        a = _.languages[r]
                    e.className =
                        e.className.replace(c, '').replace(/\s+/g, ' ') +
                        ' language-' +
                        r
                    var i = e.parentElement
                    i &&
                        'pre' === i.nodeName.toLowerCase() &&
                        (i.className =
                            i.className.replace(c, '').replace(/\s+/g, ' ') +
                            ' language-' +
                            r)
                    var l = {
                        element: e,
                        language: r,
                        grammar: a,
                        code: e.textContent,
                    }
                    function o(e) {
                        ;(l.highlightedCode = e),
                            _.hooks.run('before-insert', l),
                            (l.element.innerHTML = l.highlightedCode),
                            _.hooks.run('after-highlight', l),
                            _.hooks.run('complete', l),
                            t && t.call(l.element)
                    }
                    if ((_.hooks.run('before-sanity-check', l), !l.code))
                        return (
                            _.hooks.run('complete', l),
                            void (t && t.call(l.element))
                        )
                    if ((_.hooks.run('before-highlight', l), l.grammar))
                        if (n && u.Worker) {
                            var s = new Worker(_.filename)
                            ;(s.onmessage = function (e) {
                                o(e.data)
                            }),
                                s.postMessage(
                                    JSON.stringify({
                                        language: l.language,
                                        code: l.code,
                                        immediateClose: !0,
                                    })
                                )
                        } else o(_.highlight(l.code, l.grammar, l.language))
                    else o(_.util.encode(l.code))
                },
                highlight: function (e, n, t) {
                    var r = { code: e, grammar: n, language: t }
                    return (
                        _.hooks.run('before-tokenize', r),
                        (r.tokens = _.tokenize(r.code, r.grammar)),
                        _.hooks.run('after-tokenize', r),
                        M.stringify(_.util.encode(r.tokens), r.language)
                    )
                },
                tokenize: function (e, n) {
                    var t = n.rest
                    if (t) {
                        for (var r in t) n[r] = t[r]
                        delete n.rest
                    }
                    var a = new i()
                    return (
                        z(a, a.head, e),
                        (function e(n, t, r, a, i, l) {
                            for (var o in r)
                                if (r.hasOwnProperty(o) && r[o]) {
                                    var s = r[o]
                                    s = Array.isArray(s) ? s : [s]
                                    for (var u = 0; u < s.length; ++u) {
                                        if (l && l.cause == o + ',' + u) return
                                        var c = s[u],
                                            g = c.inside,
                                            f = !!c.lookbehind,
                                            h = !!c.greedy,
                                            d = c.alias
                                        if (h && !c.pattern.global) {
                                            var v = c.pattern
                                                .toString()
                                                .match(/[imsuy]*$/)[0]
                                            c.pattern = RegExp(
                                                c.pattern.source,
                                                v + 'g'
                                            )
                                        }
                                        for (
                                            var p = c.pattern || c,
                                                m = a.next,
                                                y = i;
                                            m !== t.tail &&
                                            !(l && y >= l.reach);
                                            y += m.value.length, m = m.next
                                        ) {
                                            var k = m.value
                                            if (t.length > n.length) return
                                            if (!(k instanceof M)) {
                                                var b,
                                                    x = 1
                                                if (h) {
                                                    if (!(b = W(p, y, n, f)))
                                                        break
                                                    var w = b.index,
                                                        A =
                                                            b.index +
                                                            b[0].length,
                                                        P = y
                                                    for (
                                                        P += m.value.length;
                                                        P <= w;

                                                    )
                                                        (m = m.next),
                                                            (P +=
                                                                m.value.length)
                                                    if (
                                                        ((P -= m.value.length),
                                                        (y = P),
                                                        m.value instanceof M)
                                                    )
                                                        continue
                                                    for (
                                                        var S = m;
                                                        S !== t.tail &&
                                                        (P < A ||
                                                            'string' ==
                                                                typeof S.value);
                                                        S = S.next
                                                    )
                                                        x++,
                                                            (P +=
                                                                S.value.length)
                                                    x--,
                                                        (k = n.slice(y, P)),
                                                        (b.index -= y)
                                                } else if (!(b = W(p, 0, k, f)))
                                                    continue
                                                var w = b.index,
                                                    E = b[0],
                                                    O = k.slice(0, w),
                                                    L = k.slice(w + E.length),
                                                    N = y + k.length
                                                l &&
                                                    N > l.reach &&
                                                    (l.reach = N)
                                                var j = m.prev
                                                O &&
                                                    ((j = z(t, j, O)),
                                                    (y += O.length)),
                                                    I(t, j, x)
                                                var C = new M(
                                                    o,
                                                    g ? _.tokenize(E, g) : E,
                                                    d,
                                                    E
                                                )
                                                ;(m = z(t, j, C)),
                                                    L && z(t, m, L),
                                                    1 < x &&
                                                        e(n, t, r, m.prev, y, {
                                                            cause: o + ',' + u,
                                                            reach: N,
                                                        })
                                            }
                                        }
                                    }
                                }
                        })(e, a, n, a.head, 0),
                        (function (e) {
                            var n = [],
                                t = e.head.next
                            for (; t !== e.tail; ) n.push(t.value), (t = t.next)
                            return n
                        })(a)
                    )
                },
                hooks: {
                    all: {},
                    add: function (e, n) {
                        var t = _.hooks.all
                        ;(t[e] = t[e] || []), t[e].push(n)
                    },
                    run: function (e, n) {
                        var t = _.hooks.all[e]
                        if (t && t.length)
                            for (var r, a = 0; (r = t[a++]); ) r(n)
                    },
                },
                Token: M,
            }
        function M(e, n, t, r) {
            ;(this.type = e),
                (this.content = n),
                (this.alias = t),
                (this.length = 0 | (r || '').length)
        }
        function W(e, n, t, r) {
            e.lastIndex = n
            var a = e.exec(t)
            if (a && r && a[1]) {
                var i = a[1].length
                ;(a.index += i), (a[0] = a[0].slice(i))
            }
            return a
        }
        function i() {
            var e = { value: null, prev: null, next: null },
                n = { value: null, prev: e, next: null }
            ;(e.next = n), (this.head = e), (this.tail = n), (this.length = 0)
        }
        function z(e, n, t) {
            var r = n.next,
                a = { value: t, prev: n, next: r }
            return (n.next = a), (r.prev = a), e.length++, a
        }
        function I(e, n, t) {
            for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next
            ;((n.next = r).prev = n), (e.length -= a)
        }
        if (
            ((u.Prism = _),
            (M.stringify = function n(e, t) {
                if ('string' == typeof e) return e
                if (Array.isArray(e)) {
                    var r = ''
                    return (
                        e.forEach(function (e) {
                            r += n(e, t)
                        }),
                        r
                    )
                }
                var a = {
                        type: e.type,
                        content: n(e.content, t),
                        tag: 'span',
                        classes: ['token', e.type],
                        attributes: {},
                        language: t,
                    },
                    i = e.alias
                i &&
                    (Array.isArray(i)
                        ? Array.prototype.push.apply(a.classes, i)
                        : a.classes.push(i)),
                    _.hooks.run('wrap', a)
                var l = ''
                for (var o in a.attributes)
                    l +=
                        ' ' +
                        o +
                        '="' +
                        (a.attributes[o] || '').replace(/"/g, '&quot;') +
                        '"'
                return (
                    '<' +
                    a.tag +
                    ' class="' +
                    a.classes.join(' ') +
                    '"' +
                    l +
                    '>' +
                    a.content +
                    '</' +
                    a.tag +
                    '>'
                )
            }),
            !u.document)
        )
            return (
                u.addEventListener &&
                    (_.disableWorkerMessageHandler ||
                        u.addEventListener(
                            'message',
                            function (e) {
                                var n = JSON.parse(e.data),
                                    t = n.language,
                                    r = n.code,
                                    a = n.immediateClose
                                u.postMessage(
                                    _.highlight(r, _.languages[t], t)
                                ),
                                    a && u.close()
                            },
                            !1
                        )),
                _
            )
        var e = _.util.currentScript()
        function t() {
            _.manual || _.highlightAll()
        }
        if (
            (e &&
                ((_.filename = e.src),
                e.hasAttribute('data-manual') && (_.manual = !0)),
            !_.manual)
        ) {
            var r = document.readyState
            'loading' === r || ('interactive' === r && e && e.defer)
                ? document.addEventListener('DOMContentLoaded', t)
                : window.requestAnimationFrame
                  ? window.requestAnimationFrame(t)
                  : window.setTimeout(t, 16)
        }
        return _
    })(_self)
'undefined' != typeof module && module.exports && (module.exports = Prism),
    'undefined' != typeof global && (global.Prism = Prism)
;(Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: {
        pattern:
            /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            'internal-subset': {
                pattern: /(\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null,
            },
            string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
            punctuation: /^<!|>$|[[\]]/,
            'doctype-tag': /^DOCTYPE/,
            name: /[^\s<>'"]+/,
        },
    },
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern:
            /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
            },
            'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [
                        { pattern: /^=/, alias: 'attr-equals' },
                        /"|'/,
                    ],
                },
            },
            punctuation: /\/?>/,
            'attr-name': {
                pattern: /[^\s>\/]+/,
                inside: { namespace: /^[^\s>\/:]+:/ },
            },
        },
    },
    entity: [
        { pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' },
        /&#x?[\da-f]{1,8};/i,
    ],
}),
    (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
        Prism.languages.markup.entity),
    (Prism.languages.markup.doctype.inside['internal-subset'].inside =
        Prism.languages.markup),
    Prism.hooks.add('wrap', function (a) {
        'entity' === a.type &&
            (a.attributes.title = a.content.replace(/&amp;/, '&'))
    }),
    Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
        value: function (a, e) {
            var s = {}
            ;(s['language-' + e] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[e],
            }),
                (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
            var n = {
                'included-cdata': {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: s,
                },
            }
            n['language-' + e] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[e],
            }
            var t = {}
            ;(t[a] = {
                pattern: RegExp(
                    '(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
                        /__/g,
                        function () {
                            return a
                        }
                    ),
                    'i'
                ),
                lookbehind: !0,
                greedy: !0,
                inside: n,
            }),
                Prism.languages.insertBefore('markup', 'cdata', t)
        },
    }),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup),
    (Prism.languages.xml = Prism.languages.extend('markup', {})),
    (Prism.languages.ssml = Prism.languages.xml),
    (Prism.languages.atom = Prism.languages.xml),
    (Prism.languages.rss = Prism.languages.xml)
!(function (s) {
    var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
    ;(s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
            pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
            inside: {
                rule: /^@[\w-]+/,
                'selector-function-argument': {
                    pattern:
                        /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                    lookbehind: !0,
                    alias: 'selector',
                },
                keyword: {
                    pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                    lookbehind: !0,
                },
            },
        },
        url: {
            pattern: RegExp(
                '\\burl\\((?:' +
                    e.source +
                    '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)',
                'i'
            ),
            greedy: !0,
            inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/,
                string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' },
            },
        },
        selector: RegExp(
            '[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' +
                e.source +
                ')*(?=\\s*\\{)'
        ),
        string: { pattern: e, greedy: !0 },
        property:
            /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        important: /!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:,]/,
    }),
        (s.languages.css.atrule.inside.rest = s.languages.css)
    var t = s.languages.markup
    t &&
        (t.tag.addInlined('style', 'css'),
        s.languages.insertBefore(
            'inside',
            'attr-value',
            {
                'style-attr': {
                    pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
                    lookbehind: !0,
                    inside: {
                        'attr-value': {
                            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                            inside: {
                                style: {
                                    pattern: /(["'])[\s\S]+(?=["']$)/,
                                    lookbehind: !0,
                                    alias: 'language-css',
                                    inside: s.languages.css,
                                },
                                punctuation: [
                                    { pattern: /^=/, alias: 'attr-equals' },
                                    /"|'/,
                                ],
                            },
                        },
                        'attr-name': /^style/i,
                    },
                },
            },
            t.tag
        ))
})(Prism)
Prism.languages.clike = {
    comment: [
        {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0,
            greedy: !0,
        },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
    },
    'class-name': {
        pattern:
            /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: { punctuation: /[.\\]/ },
    },
    keyword:
        /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/,
}
;(Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [
        Prism.languages.clike['class-name'],
        {
            pattern:
                /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
            lookbehind: !0,
        },
    ],
    keyword: [
        { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
        {
            pattern:
                /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0,
        },
    ],
    function:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    operator:
        /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
    (Prism.languages.javascript['class-name'][0].pattern =
        /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore('javascript', 'keyword', {
        regex: {
            pattern:
                /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                'regex-source': {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: 'language-regex',
                    inside: Prism.languages.regex,
                },
                'regex-flags': /[a-z]+$/,
                'regex-delimiter': /^\/|\/$/,
            },
        },
        'function-variable': {
            pattern:
                /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: 'function',
        },
        parameter: [
            {
                pattern:
                    /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    }),
    Prism.languages.insertBefore('javascript', 'string', {
        'template-string': {
            pattern:
                /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
                'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
                interpolation: {
                    pattern:
                        /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                    lookbehind: !0,
                    inside: {
                        'interpolation-punctuation': {
                            pattern: /^\${|}$/,
                            alias: 'punctuation',
                        },
                        rest: Prism.languages.javascript,
                    },
                },
                string: /[\s\S]+/,
            },
        },
    }),
    Prism.languages.markup &&
        Prism.languages.markup.tag.addInlined('script', 'javascript'),
    (Prism.languages.js = Prism.languages.javascript)
Prism.languages.ada = {
    comment: /--.*/,
    string: /"(?:""|[^"\r\f\n])*"/i,
    number: [
        {
            pattern:
                /\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[+-]?\d(?:_?\d)*)?/i,
        },
        { pattern: /\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[+-]?\d(?:_?\d)*)?\b/i },
    ],
    'attr-name': /\b'\w+/i,
    keyword:
        /\b(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|new|return|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|not|null|of|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i,
    boolean: /\b(?:true|false)\b/i,
    operator: /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
    punctuation: /\.\.?|[,;():]/,
    char: /'.'/,
    variable: /\b[a-z](?:[_a-z\d])*\b/i,
}
Prism.languages.apacheconf = {
    comment: /#.*/,
    'directive-inline': {
        pattern:
            /(^\s*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|Add(?:Alt|AltByEncoding|AltByType|Charset|DefaultCharset|Description|Encoding|Handler|Icon|IconByEncoding|IconByType|InputFilter|Language|ModuleInfo|OutputFilter|OutputFilterByType|Type)|Alias|AliasMatch|Allow(?:CONNECT|EncodedSlashes|Methods|Override|OverrideList)?|Anonymous(?:_LogEmail|_MustGiveEmail|_NoUserID|_VerifyEmail)?|AsyncRequestWorkerFactor|Auth(?:BasicAuthoritative|BasicFake|BasicProvider|BasicUseDigestAlgorithm|DBDUserPWQuery|DBDUserRealmQuery|DBMGroupFile|DBMType|DBMUserFile|Digest(?:Algorithm|Domain|NonceLifetime|Provider|Qop|ShmemSize)|Form(?:Authoritative|Body|DisableNoStore|FakeBasicAuth|Location|LoginRequiredLocation|LoginSuccessLocation|LogoutLocation|Method|Mimetype|Password|Provider|SitePassphrase|Size|Username)|GroupFile|LDAP(?:AuthorizePrefix|BindAuthoritative|BindDN|BindPassword|CharsetConfig|CompareAsUser|CompareDNOnServer|DereferenceAliases|GroupAttribute|GroupAttributeIsDN|InitialBindAsUser|InitialBindPattern|MaxSubGroupDepth|RemoteUserAttribute|RemoteUserIsDN|SearchAsUser|SubGroupAttribute|SubGroupClass|Url)|Merging|Name|Type|UserFile|nCache(?:Context|Enable|ProvideFor|SOCache|Timeout)|nzFcgiCheckAuthnProvider|nzFcgiDefineProvider|zDBDLoginToReferer|zDBDQuery|zDBDRedirectQuery|zDBMType|zSendForbiddenOnFailure)|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferSize|BufferedLogs|CGIDScriptTimeout|CGIMapExtension|Cache(?:DefaultExpire|DetailHeader|DirLength|DirLevels|Disable|Enable|File|Header|IgnoreCacheControl|IgnoreHeaders|IgnoreNoLastMod|IgnoreQueryString|IgnoreURLSessionIdentifiers|KeyBaseURL|LastModifiedFactor|Lock|LockMaxAge|LockPath|MaxExpire|MaxFileSize|MinExpire|MinFileSize|NegotiatedDocs|QuickHandler|ReadSize|ReadTime|Root|Socache(?:MaxSize|MaxTime|MinTime|ReadSize|ReadTime)?|StaleOnError|StoreExpired|StoreNoStore|StorePrivate)|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DTracePrivileges|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|Deflate(?:BufferSize|CompressionLevel|FilterNote|InflateLimitRequestBody|InflateRatio(?:Burst|Limit)|MemLevel|WindowSize)|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtFilterDefine|ExtFilterOptions|ExtendedStatus|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|Heartbeat(?:Address|Listen|MaxServers|Storage)|HostnameLookups|ISAPI(?:AppendLogToErrors|AppendLogToQuery|CacheFile|FakeAsync|LogNotSupported|ReadAheadBuffer)|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|Index(?:HeadInsert|Ignore|IgnoreReset|Options|OrderDefault|StyleSheet)|InputSed|KeepAlive|KeepAliveTimeout|KeptBodySize|LDAP(?:CacheEntries|CacheTTL|ConnectionPoolTTL|ConnectionTimeout|LibraryDebug|OpCacheEntries|OpCacheTTL|ReferralHopLimit|Referrals|Retries|RetryDelay|SharedCacheFile|SharedCacheSize|Timeout|TrustedClientCert|TrustedGlobalCert|TrustedMode|VerifyServerCert)|LanguagePriority|Limit(?:InternalRecursion|Request(?:Body|FieldSize|Fields|Line)|XMLRequestBody)|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|Lua(?:Hook(?:AccessChecker|AuthChecker|CheckUserID|Fixups|InsertFilter|Log|MapToStorage|TranslateName|TypeChecker)|Inherit|InputFilter|MapHandler|OutputFilter|PackageCPath|PackagePath|QuickHandler|Root|Scope)|MMapFile|Max(?:ConnectionsPerChild|KeepAliveRequests|MemFree|RangeOverlaps|RangeReversals|Ranges|RequestWorkers|SpareServers|SpareThreads|Threads)|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|ModMimeUsePathInfo|ModemStandard|MultiviewsMatch|Mutex|NWSSLTrustedCerts|NWSSLUpgradeable|NameVirtualHost|NoProxy|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|Proxy(?:AddHeaders|BadHeader|Block|Domain|ErrorOverride|ExpressDBMFile|ExpressDBMType|ExpressEnable|FtpDirCharset|FtpEscapeWildcards|FtpListOnWildcard|HTML(?:BufSize|CharsetOut|DocType|Enable|Events|Extended|Fixups|Interp|Links|Meta|StripComments|URLMap)|IOBufferSize|MaxForwards|Pass(?:Inherit|InterpolateEnv|Match|Reverse|ReverseCookieDomain|ReverseCookiePath)?|PreserveHost|ReceiveBufferSize|Remote|RemoteMatch|Requests|SCGIInternalRedirect|SCGISendfile|Set|SourceAddress|Status|Timeout|Via)|RLimitCPU|RLimitMEM|RLimitNPROC|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIP(?:Header|InternalProxy|InternalProxyList|ProxiesHeader|TrustedProxy|TrustedProxyList)|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|Rewrite(?:Base|Cond|Engine|Map|Options|Rule)|SSIETag|SSIEndTag|SSIErrorMsg|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSL(?:CACertificateFile|CACertificatePath|CADNRequestFile|CADNRequestPath|CARevocationCheck|CARevocationFile|CARevocationPath|CertificateChainFile|CertificateFile|CertificateKeyFile|CipherSuite|Compression|CryptoDevice|Engine|FIPS|HonorCipherOrder|InsecureRenegotiation|OCSP(?:DefaultResponder|Enable|OverrideResponder|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|UseRequestNonce)|OpenSSLConfCmd|Options|PassPhraseDialog|Protocol|Proxy(?:CACertificateFile|CACertificatePath|CARevocation(?:Check|File|Path)|CheckPeer(?:CN|Expire|Name)|CipherSuite|Engine|MachineCertificate(?:ChainFile|File|Path)|Protocol|Verify|VerifyDepth)|RandomSeed|RenegBufferSize|Require|RequireSSL|SRPUnknownUserSeed|SRPVerifierFile|Session(?:Cache|CacheTimeout|TicketKeyFile|Tickets)|Stapling(?:Cache|ErrorCacheTimeout|FakeTryLater|ForceURL|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|ReturnResponderErrors|StandardCacheTimeout)|StrictSNIVHostCheck|UseStapling|UserName|VerifyClient|VerifyDepth)|Satisfy|ScoreBoardFile|Script(?:Alias|AliasMatch|InterpreterSource|Log|LogBuffer|LogLength|Sock)?|SecureListen|SeeRequestTail|SendBufferSize|Server(?:Admin|Alias|Limit|Name|Path|Root|Signature|Tokens)|Session(?:Cookie(?:Name|Name2|Remove)|Crypto(?:Cipher|Driver|Passphrase|PassphraseFile)|DBD(?:CookieName|CookieName2|CookieRemove|DeleteLabel|InsertLabel|PerUser|SelectLabel|UpdateLabel)|Env|Exclude|Header|Include|MaxAge)?|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadStackSize|ThreadsPerChild|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|Virtual(?:DocumentRoot|ScriptAlias)(?:IP)?|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,
        lookbehind: !0,
        alias: 'property',
    },
    'directive-block': {
        pattern:
            /<\/?\b(?:Auth[nz]ProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|Require(?:All|Any|None)|VirtualHost)\b.*>/i,
        inside: {
            'directive-block': {
                pattern: /^<\/?\w+/,
                inside: { punctuation: /^<\/?/ },
                alias: 'tag',
            },
            'directive-block-parameter': {
                pattern: /.*[^>]/,
                inside: {
                    punctuation: /:/,
                    string: {
                        pattern: /("|').*\1/,
                        inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ },
                    },
                },
                alias: 'attr-value',
            },
            punctuation: />/,
        },
        alias: 'tag',
    },
    'directive-flags': { pattern: /\[(?:[\w=],?)+\]/, alias: 'keyword' },
    string: {
        pattern: /("|').*\1/,
        inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ },
    },
    variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
    regex: /\^?.*\$|\^.*\$?/,
}
!(function (e) {
    var t =
            '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b',
        n = {
            pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
            lookbehind: !0,
            alias: 'punctuation',
            inside: null,
        },
        a = {
            bash: n,
            environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
            variable: [
                {
                    pattern: /\$?\(\([\s\S]+?\)\)/,
                    greedy: !0,
                    inside: {
                        variable: [
                            { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
                            /^\$\(\(/,
                        ],
                        number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
                        operator:
                            /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                        punctuation: /\(\(?|\)\)?|,|;/,
                    },
                },
                {
                    pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
                    greedy: !0,
                    inside: { variable: /^\$\(|^`|\)$|`$/ },
                },
                {
                    pattern: /\$\{[^}]+\}/,
                    greedy: !0,
                    inside: {
                        operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                        punctuation: /[\[\]]/,
                        environment: {
                            pattern: RegExp('(\\{)' + t),
                            lookbehind: !0,
                            alias: 'constant',
                        },
                    },
                },
                /\$(?:\w+|[#?*!@$])/,
            ],
            entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
        }
    ;(e.languages.bash = {
        shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
        comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
        'function-name': [
            {
                pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
                lookbehind: !0,
                alias: 'function',
            },
            { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: 'function' },
        ],
        'for-or-select': {
            pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
            alias: 'variable',
            lookbehind: !0,
        },
        'assign-left': {
            pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
            inside: {
                environment: {
                    pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t),
                    lookbehind: !0,
                    alias: 'constant',
                },
            },
            alias: 'variable',
            lookbehind: !0,
        },
        string: [
            {
                pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/,
                lookbehind: !0,
                greedy: !0,
                inside: a,
            },
            {
                pattern:
                    /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
                lookbehind: !0,
                greedy: !0,
                inside: { bash: n },
            },
            {
                pattern:
                    /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|(?!\2)[^\\`$])*\2/,
                lookbehind: !0,
                greedy: !0,
                inside: a,
            },
        ],
        environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
        variable: a.variable,
        function: {
            pattern:
                /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
            lookbehind: !0,
        },
        keyword: {
            pattern:
                /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
            lookbehind: !0,
        },
        builtin: {
            pattern:
                /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
            lookbehind: !0,
            alias: 'class-name',
        },
        boolean: {
            pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
            lookbehind: !0,
        },
        'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
        operator: {
            pattern:
                /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
            inside: {
                'file-descriptor': { pattern: /^\d/, alias: 'important' },
            },
        },
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        number: {
            pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
            lookbehind: !0,
        },
    }),
        (n.inside = e.languages.bash)
    for (
        var s = [
                'comment',
                'function-name',
                'for-or-select',
                'assign-left',
                'string',
                'environment',
                'function',
                'keyword',
                'builtin',
                'boolean',
                'file-descriptor',
                'operator',
                'punctuation',
                'number',
            ],
            i = a.variable[1].inside,
            o = 0;
        o < s.length;
        o++
    )
        i[s[o]] = e.languages.bash[s[o]]
    e.languages.shell = e.languages.bash
})(Prism)
!(function (e) {
    var r = /%%?[~:\w]+%?|!\S+!/,
        t = {
            pattern: /\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im,
            alias: 'attr-name',
            inside: { punctuation: /:/ },
        },
        n = /"(?:[\\"]"|[^"])*"(?!")/,
        i = /(?:\b|-)\d+\b/
    Prism.languages.batch = {
        comment: [
            /^::.*/m,
            {
                pattern:
                    /((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
                lookbehind: !0,
            },
        ],
        label: { pattern: /^:.*/m, alias: 'property' },
        command: [
            {
                pattern:
                    /((?:^|[&(])[ \t]*)for(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* \S+ in \([^)]+\) do/im,
                lookbehind: !0,
                inside: {
                    keyword: /^for\b|\b(?:in|do)\b/i,
                    string: n,
                    parameter: t,
                    variable: r,
                    number: i,
                    punctuation: /[()',]/,
                },
            },
            {
                pattern:
                    /((?:^|[&(])[ \t]*)if(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|(?!")(?:(?!==)\S)+)?(?:==| (?:equ|neq|lss|leq|gtr|geq) )(?:"[^"]*"|[^\s"]\S*))/im,
                lookbehind: !0,
                inside: {
                    keyword:
                        /^if\b|\b(?:not|cmdextversion|defined|errorlevel|exist)\b/i,
                    string: n,
                    parameter: t,
                    variable: r,
                    number: i,
                    operator: /\^|==|\b(?:equ|neq|lss|leq|gtr|geq)\b/i,
                },
            },
            {
                pattern: /((?:^|[&()])[ \t]*)else\b/im,
                lookbehind: !0,
                inside: { keyword: /^else\b/i },
            },
            {
                pattern:
                    /((?:^|[&(])[ \t]*)set(?: \/[a-z](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
                lookbehind: !0,
                inside: {
                    keyword: /^set\b/i,
                    string: n,
                    parameter: t,
                    variable: [r, /\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/],
                    number: i,
                    operator: /[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/,
                    punctuation: /[()',]/,
                },
            },
            {
                pattern:
                    /((?:^|[&(])[ \t]*@?)\w+\b(?:"(?:[\\"]"|[^"])*"(?!")|[^"^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
                lookbehind: !0,
                inside: {
                    keyword: /^\w+\b/i,
                    string: n,
                    parameter: t,
                    label: {
                        pattern: /(^\s*):\S+/m,
                        lookbehind: !0,
                        alias: 'property',
                    },
                    variable: r,
                    number: i,
                    operator: /\^/,
                },
            },
        ],
        operator: /[&@]/,
        punctuation: /[()']/,
    }
})()
;(Prism.languages.c = Prism.languages.extend('clike', {
    comment: {
        pattern:
            /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: !0,
    },
    'class-name': {
        pattern:
            /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
        lookbehind: !0,
    },
    keyword:
        /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    function: /[a-z_]\w*(?=\s*\()/i,
    number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
})),
    Prism.languages.insertBefore('c', 'string', {
        macro: {
            pattern:
                /(^\s*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
            lookbehind: !0,
            greedy: !0,
            alias: 'property',
            inside: {
                string: [
                    { pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 },
                    Prism.languages.c.string,
                ],
                comment: Prism.languages.c.comment,
                'macro-name': [
                    { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
                    {
                        pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
                        lookbehind: !0,
                        alias: 'function',
                    },
                ],
                directive: {
                    pattern: /^(#\s*)[a-z]+/,
                    lookbehind: !0,
                    alias: 'keyword',
                },
                'directive-hash': /^#/,
                punctuation: /##|\\(?=[\r\n])/,
                expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
            },
        },
        constant:
            /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
    }),
    delete Prism.languages.c.boolean
!(function (s) {
    function a(e, s) {
        return e.replace(/<<(\d+)>>/g, function (e, n) {
            return '(?:' + s[+n] + ')'
        })
    }
    function t(e, n, s) {
        return RegExp(a(e, n), s || '')
    }
    function e(e, n) {
        for (var s = 0; s < n; s++)
            e = e.replace(/<<self>>/g, function () {
                return '(?:' + e + ')'
            })
        return e.replace(/<<self>>/g, '[^\\s\\S]')
    }
    var n =
            'bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void',
        i = 'class enum interface struct',
        r =
            'add alias and ascending async await by descending from get global group into join let nameof not notnull on or orderby partial remove select set unmanaged value when where',
        o =
            'abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield'
    function l(e) {
        return '\\b(?:' + e.trim().replace(/ /g, '|') + ')\\b'
    }
    var d = l(i),
        p = RegExp(l(n + ' ' + i + ' ' + r + ' ' + o)),
        c = l(i + ' ' + r + ' ' + o),
        u = l(n + ' ' + i + ' ' + o),
        g = e('<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>', 2),
        b = e('\\((?:[^()]|<<self>>)*\\)', 2),
        h = '@?\\b[A-Za-z_]\\w*\\b',
        f = a('<<0>>(?:\\s*<<1>>)?', [h, g]),
        m = a('(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*', [c, f]),
        k = '\\[\\s*(?:,\\s*)*\\]',
        y = a('<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?', [m, k]),
        w = a('(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?', [
            a('\\(<<0>>+(?:,<<0>>+)+\\)', [
                a('[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>', [g, b, k]),
            ]),
            m,
            k,
        ]),
        v = { keyword: p, punctuation: /[<>()?,.:[\]]/ },
        x = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'",
        $ = '"(?:\\\\.|[^\\\\"\r\n])*"'
    ;(s.languages.csharp = s.languages.extend('clike', {
        string: [
            {
                pattern: t('(^|[^$\\\\])<<0>>', [
                    '@"(?:""|\\\\[^]|[^\\\\"])*"(?!")',
                ]),
                lookbehind: !0,
                greedy: !0,
            },
            {
                pattern: t('(^|[^@$\\\\])<<0>>', [$]),
                lookbehind: !0,
                greedy: !0,
            },
            { pattern: RegExp(x), greedy: !0, alias: 'character' },
        ],
        'class-name': [
            {
                pattern: t('(\\busing\\s+static\\s+)<<0>>(?=\\s*;)', [m]),
                lookbehind: !0,
                inside: v,
            },
            {
                pattern: t('(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)', [
                    h,
                    w,
                ]),
                lookbehind: !0,
                inside: v,
            },
            { pattern: t('(\\busing\\s+)<<0>>(?=\\s*=)', [h]), lookbehind: !0 },
            {
                pattern: t('(\\b<<0>>\\s+)<<1>>', [d, f]),
                lookbehind: !0,
                inside: v,
            },
            {
                pattern: t('(\\bcatch\\s*\\(\\s*)<<0>>', [m]),
                lookbehind: !0,
                inside: v,
            },
            { pattern: t('(\\bwhere\\s+)<<0>>', [h]), lookbehind: !0 },
            {
                pattern: t('(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>', [y]),
                lookbehind: !0,
                inside: v,
            },
            {
                pattern: t(
                    '\\b<<0>>(?=\\s+(?!<<1>>)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))',
                    [w, u, h]
                ),
                inside: v,
            },
        ],
        keyword: p,
        number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,
        operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/,
    })),
        s.languages.insertBefore('csharp', 'number', {
            range: { pattern: /\.\./, alias: 'operator' },
        }),
        s.languages.insertBefore('csharp', 'punctuation', {
            'named-parameter': {
                pattern: t('([(,]\\s*)<<0>>(?=\\s*:)', [h]),
                lookbehind: !0,
                alias: 'punctuation',
            },
        }),
        s.languages.insertBefore('csharp', 'class-name', {
            namespace: {
                pattern: t(
                    '(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])',
                    [h]
                ),
                lookbehind: !0,
                inside: { punctuation: /\./ },
            },
            'type-expression': {
                pattern: t(
                    '(\\b(?:default|typeof|sizeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))',
                    [b]
                ),
                lookbehind: !0,
                alias: 'class-name',
                inside: v,
            },
            'return-type': {
                pattern: t(
                    '<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))',
                    [w, m]
                ),
                inside: v,
                alias: 'class-name',
            },
            'constructor-invocation': {
                pattern: t('(\\bnew\\s+)<<0>>(?=\\s*[[({])', [w]),
                lookbehind: !0,
                inside: v,
                alias: 'class-name',
            },
            'generic-method': {
                pattern: t('<<0>>\\s*<<1>>(?=\\s*\\()', [h, g]),
                inside: {
                    function: t('^<<0>>', [h]),
                    generic: {
                        pattern: RegExp(g),
                        alias: 'class-name',
                        inside: v,
                    },
                },
            },
            'type-list': {
                pattern: t(
                    '\\b((?:<<0>>\\s+<<1>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>)(?:\\s*,\\s*(?:<<3>>|<<4>>))*(?=\\s*(?:where|[{;]|=>|$))',
                    [d, f, h, w, p.source]
                ),
                lookbehind: !0,
                inside: {
                    keyword: p,
                    'class-name': { pattern: RegExp(w), greedy: !0, inside: v },
                    punctuation: /,/,
                },
            },
            preprocessor: {
                pattern: /(^\s*)#.*/m,
                lookbehind: !0,
                alias: 'property',
                inside: {
                    directive: {
                        pattern:
                            /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                        lookbehind: !0,
                        alias: 'keyword',
                    },
                },
            },
        })
    var _ = $ + '|' + x,
        B = a('/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>', [
            _,
        ]),
        E = e(a('[^"\'/()]|<<0>>|\\(<<self>>*\\)', [B]), 2),
        R =
            '\\b(?:assembly|event|field|method|module|param|property|return|type)\\b',
        P = a('<<0>>(?:\\s*\\(<<1>>*\\))?', [m, E])
    s.languages.insertBefore('csharp', 'class-name', {
        attribute: {
            pattern: t(
                '((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])',
                [R, P]
            ),
            lookbehind: !0,
            greedy: !0,
            inside: {
                target: {
                    pattern: t('^<<0>>(?=\\s*:)', [R]),
                    alias: 'keyword',
                },
                'attribute-arguments': {
                    pattern: t('\\(<<0>>*\\)', [E]),
                    inside: s.languages.csharp,
                },
                'class-name': {
                    pattern: RegExp(m),
                    inside: { punctuation: /\./ },
                },
                punctuation: /[:,]/,
            },
        },
    })
    var z = ':[^}\r\n]+',
        S = e(a('[^"\'/()]|<<0>>|\\(<<self>>*\\)', [B]), 2),
        j = a('\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}', [S, z]),
        A = e(
            a(
                '[^"\'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)',
                [_]
            ),
            2
        ),
        F = a('\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}', [A, z])
    function U(e, n) {
        return {
            interpolation: {
                pattern: t('((?:^|[^{])(?:\\{\\{)*)<<0>>', [e]),
                lookbehind: !0,
                inside: {
                    'format-string': {
                        pattern: t('(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)', [
                            n,
                            z,
                        ]),
                        lookbehind: !0,
                        inside: { punctuation: /^:/ },
                    },
                    punctuation: /^\{|\}$/,
                    expression: {
                        pattern: /[\s\S]+/,
                        alias: 'language-csharp',
                        inside: s.languages.csharp,
                    },
                },
            },
            string: /[\s\S]+/,
        }
    }
    s.languages.insertBefore('csharp', 'string', {
        'interpolation-string': [
            {
                pattern: t(
                    '(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"',
                    [j]
                ),
                lookbehind: !0,
                greedy: !0,
                inside: U(j, S),
            },
            {
                pattern: t(
                    '(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"',
                    [F]
                ),
                lookbehind: !0,
                greedy: !0,
                inside: U(F, A),
            },
        ],
    })
})(Prism),
    (Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp)
!(function (e) {
    var t =
        /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/
    ;(e.languages.cpp = e.languages.extend('c', {
        'class-name': [
            {
                pattern: RegExp(
                    '(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+'.replace(
                        /<keyword>/g,
                        function () {
                            return t.source
                        }
                    )
                ),
                lookbehind: !0,
            },
            /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
            /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
            /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
        ],
        keyword: t,
        number: {
            pattern:
                /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
            greedy: !0,
        },
        operator:
            />>=?|<<=?|->|([-+&|:])\1|[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
        boolean: /\b(?:true|false)\b/,
    })),
        e.languages.insertBefore('cpp', 'string', {
            'raw-string': {
                pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
                alias: 'string',
                greedy: !0,
            },
        }),
        e.languages.insertBefore('cpp', 'class-name', {
            'base-clause': {
                pattern:
                    /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
                lookbehind: !0,
                greedy: !0,
                inside: e.languages.extend('cpp', {}),
            },
        }),
        e.languages.insertBefore(
            'inside',
            'operator',
            { 'class-name': /\b[a-z_]\w*\b(?!\s*::)/i },
            e.languages.cpp['base-clause']
        )
})(Prism)
!(function (e) {
    var t = /#(?!\{).+/,
        n = { pattern: /#\{[^}]+\}/, alias: 'variable' }
    ;(e.languages.coffeescript = e.languages.extend('javascript', {
        comment: t,
        string: [
            { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 },
            {
                pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                greedy: !0,
                inside: { interpolation: n },
            },
        ],
        keyword:
            /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
        'class-member': { pattern: /@(?!\d)\w+/, alias: 'variable' },
    })),
        e.languages.insertBefore('coffeescript', 'comment', {
            'multiline-comment': {
                pattern: /###[\s\S]+?###/,
                alias: 'comment',
            },
            'block-regex': {
                pattern: /\/{3}[\s\S]*?\/{3}/,
                alias: 'regex',
                inside: { comment: t, interpolation: n },
            },
        }),
        e.languages.insertBefore('coffeescript', 'string', {
            'inline-javascript': {
                pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                inside: {
                    delimiter: { pattern: /^`|`$/, alias: 'punctuation' },
                    script: {
                        pattern: /[\s\S]+/,
                        alias: 'language-javascript',
                        inside: e.languages.javascript,
                    },
                },
            },
            'multiline-string': [
                { pattern: /'''[\s\S]*?'''/, greedy: !0, alias: 'string' },
                {
                    pattern: /"""[\s\S]*?"""/,
                    greedy: !0,
                    alias: 'string',
                    inside: { interpolation: n },
                },
            ],
        }),
        e.languages.insertBefore('coffeescript', 'keyword', {
            property: /(?!\d)\w+(?=\s*:(?!:))/,
        }),
        delete e.languages.coffeescript['template-string'],
        (e.languages.coffee = e.languages.coffeescript)
})(Prism)
!(function (e) {
    var a,
        n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
    ;(e.languages.css.selector = {
        pattern: e.languages.css.selector,
        inside: (a = {
            'pseudo-element':
                /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
            'pseudo-class': /:[-\w]+/,
            class: /\.[-\w]+/,
            id: /#[-\w]+/,
            attribute: {
                pattern: RegExp('\\[(?:[^[\\]"\']|' + n.source + ')*\\]'),
                greedy: !0,
                inside: {
                    punctuation: /^\[|\]$/,
                    'case-sensitivity': {
                        pattern: /(\s)[si]$/i,
                        lookbehind: !0,
                        alias: 'keyword',
                    },
                    namespace: {
                        pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
                        lookbehind: !0,
                        inside: { punctuation: /\|$/ },
                    },
                    'attr-name': {
                        pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
                        lookbehind: !0,
                    },
                    'attr-value': [
                        n,
                        {
                            pattern:
                                /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
                            lookbehind: !0,
                        },
                    ],
                    operator: /[|~*^$]?=/,
                },
            },
            'n-th': [
                {
                    pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
                    lookbehind: !0,
                    inside: { number: /[\dn]+/, operator: /[+-]/ },
                },
                { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
            ],
            combinator: />|\+|~|\|\|/,
            punctuation: /[(),]/,
        }),
    }),
        (e.languages.css.atrule.inside['selector-function-argument'].inside =
            a),
        e.languages.insertBefore('css', 'property', {
            variable: {
                pattern:
                    /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
                lookbehind: !0,
            },
        })
    var r = { pattern: /(\b\d+)(?:%|[a-z]+\b)/, lookbehind: !0 },
        i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 }
    e.languages.insertBefore('css', 'function', {
        operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
        hexcode: { pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i, alias: 'color' },
        color: [
            /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
            {
                pattern:
                    /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
                inside: {
                    unit: r,
                    number: i,
                    function: /[\w-]+(?=\()/,
                    punctuation: /[(),]/,
                },
            },
        ],
        entity: /\\[\da-f]{1,8}/i,
        unit: r,
        number: i,
    })
})(Prism)
;(Prism.languages.dart = Prism.languages.extend('clike', {
    string: [
        { pattern: /r?("""|''')[\s\S]*?\1/, greedy: !0 },
        { pattern: /r?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    ],
    keyword: [
        /\b(?:async|sync|yield)\*/,
        /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extension|external|extends|factory|final|finally|for|Function|get|hide|if|implements|interface|import|in|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/,
    ],
    operator:
        /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/,
})),
    Prism.languages.insertBefore('dart', 'function', {
        metadata: { pattern: /@\w+/, alias: 'symbol' },
    })
!(function (h) {
    function v(e, n) {
        return '___' + e.toUpperCase() + n + '___'
    }
    Object.defineProperties((h.languages['markup-templating'] = {}), {
        buildPlaceholders: {
            value: function (a, r, e, o) {
                if (a.language === r) {
                    var c = (a.tokenStack = [])
                    ;(a.code = a.code.replace(e, function (e) {
                        if ('function' == typeof o && !o(e)) return e
                        for (
                            var n, t = c.length;
                            -1 !== a.code.indexOf((n = v(r, t)));

                        )
                            ++t
                        return (c[t] = e), n
                    })),
                        (a.grammar = h.languages.markup)
                }
            },
        },
        tokenizePlaceholders: {
            value: function (p, k) {
                if (p.language === k && p.tokenStack) {
                    p.grammar = h.languages[k]
                    var m = 0,
                        d = Object.keys(p.tokenStack)
                    !(function e(n) {
                        for (var t = 0; t < n.length && !(m >= d.length); t++) {
                            var a = n[t]
                            if (
                                'string' == typeof a ||
                                (a.content && 'string' == typeof a.content)
                            ) {
                                var r = d[m],
                                    o = p.tokenStack[r],
                                    c = 'string' == typeof a ? a : a.content,
                                    i = v(k, r),
                                    u = c.indexOf(i)
                                if (-1 < u) {
                                    ++m
                                    var g = c.substring(0, u),
                                        l = new h.Token(
                                            k,
                                            h.tokenize(o, p.grammar),
                                            'language-' + k,
                                            o
                                        ),
                                        s = c.substring(u + i.length),
                                        f = []
                                    g && f.push.apply(f, e([g])),
                                        f.push(l),
                                        s && f.push.apply(f, e([s])),
                                        'string' == typeof a
                                            ? n.splice.apply(
                                                  n,
                                                  [t, 1].concat(f)
                                              )
                                            : (a.content = f)
                                }
                            } else a.content && e(a.content)
                        }
                        return n
                    })(p.tokens)
                }
            },
        },
    })
})(Prism)
!(function (e) {
    e.languages.django = {
        comment: /^{#[\s\S]*?#}$/,
        tag: { pattern: /(^{%[+-]?\s*)\w+/, lookbehind: !0, alias: 'keyword' },
        delimiter: { pattern: /^{[{%][+-]?|[+-]?[}%]}$/, alias: 'punctuation' },
        string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
        filter: { pattern: /(\|)\w+/, lookbehind: !0, alias: 'function' },
        test: {
            pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/,
            lookbehind: !0,
            alias: 'function',
        },
        function: /\b[a-z_]\w+(?=\s*\()/i,
        keyword:
            /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,
        operator: /[-+*/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
        number: /\b\d+(?:\.\d+)?\b/,
        boolean: /[Tt]rue|[Ff]alse|[Nn]one/,
        variable: /\b\w+?\b/,
        punctuation: /[{}[\](),.:;]/,
    }
    var n = /{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g,
        o = e.languages['markup-templating']
    e.hooks.add('before-tokenize', function (e) {
        o.buildPlaceholders(e, 'django', n)
    }),
        e.hooks.add('after-tokenize', function (e) {
            o.tokenizePlaceholders(e, 'django')
        }),
        (e.languages.jinja2 = e.languages.django),
        e.hooks.add('before-tokenize', function (e) {
            o.buildPlaceholders(e, 'jinja2', n)
        }),
        e.hooks.add('after-tokenize', function (e) {
            o.tokenizePlaceholders(e, 'jinja2')
        })
})(Prism)
;(Prism.languages['dns-zone-file'] = {
    comment: /;.*/,
    string: { pattern: /"(?:\\.|[^"\\\r\n])*"/, greedy: !0 },
    variable: [
        { pattern: /(^\$ORIGIN[ \t]+)\S+/m, lookbehind: !0 },
        { pattern: /(^|\s)@(?=\s|$)/, lookbehind: !0 },
    ],
    keyword: /^\$(?:ORIGIN|INCLUDE|TTL)(?=\s|$)/m,
    class: {
        pattern: /(^|\s)(?:IN|CH|CS|HS)(?=\s|$)/,
        lookbehind: !0,
        alias: 'keyword',
    },
    type: {
        pattern:
            /(^|\s)(?:A|A6|AAAA|AFSDB|APL|ATMA|CAA|CDNSKEY|CDS|CERT|CNAME|DHCID|DLV|DNAME|DNSKEY|DS|EID|GID|GPOS|HINFO|HIP|IPSECKEY|ISDN|KEY|KX|LOC|MAILA|MAILB|MB|MD|MF|MG|MINFO|MR|MX|NAPTR|NB|NBSTAT|NIMLOC|NINFO|NS|NSAP|NSAP-PTR|NSEC|NSEC3|NSEC3PARAM|NULL|NXT|OPENPGPKEY|PTR|PX|RKEY|RP|RRSIG|RT|SIG|SINK|SMIMEA|SOA|SPF|SRV|SSHFP|TA|TKEY|TLSA|TSIG|TXT|UID|UINFO|UNSPEC|URI|WKS|X25)(?=\s|$)/,
        lookbehind: !0,
        alias: 'keyword',
    },
    punctuation: /[()]/,
}),
    (Prism.languages['dns-zone'] = Prism.languages['dns-zone-file'])
;(Prism.languages.docker = {
    keyword: {
        pattern:
            /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
        lookbehind: !0,
    },
    string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
    comment: { pattern: /#.*/, greedy: !0 },
    punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/,
}),
    (Prism.languages.dockerfile = Prism.languages.docker)
;(Prism.languages.elixir = {
    comment: /#.*/m,
    regex: {
        pattern:
            /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
        greedy: !0,
    },
    string: [
        {
            pattern:
                /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|#(?!\{)|[^#\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
            greedy: !0,
            inside: {},
        },
        { pattern: /("""|''')[\s\S]*?\1/, greedy: !0, inside: {} },
        {
            pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0,
            inside: {},
        },
    ],
    atom: { pattern: /(^|[^:]):\w+/, lookbehind: !0, alias: 'symbol' },
    'attr-name': /\w+\??:(?!:)/,
    capture: {
        pattern: /(^|[^&])&(?:[^&\s\d()][^\s()]*|(?=\())/,
        lookbehind: !0,
        alias: 'function',
    },
    argument: { pattern: /(^|[^&])&\d+/, lookbehind: !0, alias: 'variable' },
    attribute: { pattern: /@\w+/, alias: 'variable' },
    number: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
    keyword:
        /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct|delegate)?|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b/,
    boolean: /\b(?:true|false|nil)\b/,
    operator: [
        /\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/,
        { pattern: /([^<])<(?!<)/, lookbehind: !0 },
        { pattern: /([^>])>(?!>)/, lookbehind: !0 },
    ],
    punctuation: /<<|>>|[.,%\[\]{}()]/,
}),
    Prism.languages.insertBefore('elixir', 'keyword', {
        module: {
            pattern: /\b(defmodule\s)[A-Z][\w.\\]+/,
            lookbehind: !0,
            alias: 'class-name',
        },
        function: { pattern: /\b(defp?\s)[\w.\\]+/, lookbehind: !0 },
    }),
    Prism.languages.elixir.string.forEach(function (e) {
        e.inside = {
            interpolation: {
                pattern: /#\{[^}]+\}/,
                inside: {
                    delimiter: { pattern: /^#\{|\}$/, alias: 'punctuation' },
                    rest: Prism.languages.elixir,
                },
            },
        }
    })
Prism.languages.lua = {
    comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
    string: {
        pattern:
            /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
        greedy: !0,
    },
    number: /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
    keyword:
        /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
    function: /(?!\d)\w+(?=\s*(?:[({]))/,
    operator: [
        /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
        { pattern: /(^|[^.])\.\.(?!\.)/, lookbehind: !0 },
    ],
    punctuation: /[\[\](){},;]|\.+|:+/,
}
!(function (e) {
    ;(e.languages.etlua = {
        delimiter: { pattern: /^<%[-=]?|-?%>$/, alias: 'punctuation' },
        'language-lua': { pattern: /[\s\S]+/, inside: e.languages.lua },
    }),
        e.hooks.add('before-tokenize', function (a) {
            e.languages['markup-templating'].buildPlaceholders(
                a,
                'etlua',
                /<%[\s\S]+?%>/g
            )
        }),
        e.hooks.add('after-tokenize', function (a) {
            e.languages['markup-templating'].tokenizePlaceholders(a, 'etlua')
        })
})(Prism)
Prism.languages.erlang = {
    comment: /%.+/,
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
    'quoted-function': {
        pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
        alias: 'function',
    },
    'quoted-atom': { pattern: /'(?:\\.|[^\\'\r\n])+'/, alias: 'atom' },
    boolean: /\b(?:true|false)\b/,
    keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
    number: [
        /\$\\?./,
        /\d+#[a-z0-9]+/i,
        /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    ],
    function: /\b[a-z][\w@]*(?=\()/,
    variable: { pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/, lookbehind: !0 },
    operator: [
        /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/,
        { pattern: /(^|[^<])<(?!<)/, lookbehind: !0 },
        { pattern: /(^|[^>])>(?!>)/, lookbehind: !0 },
    ],
    atom: /\b[a-z][\w@]*/,
    punctuation: /[()[\]{}:;,.#|]|<<|>>/,
}
Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
    command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
    coord: /^@@.*@@$/m,
    'commit-sha1': /^commit \w{40}$/m,
}
;(Prism.languages.go = Prism.languages.extend('clike', {
    string: { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    keyword:
        /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    boolean: /\b(?:_|iota|nil|true|false)\b/,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    operator:
        /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    builtin:
        /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
})),
    delete Prism.languages.go['class-name']
Prism.languages.graphql = {
    comment: /#.*/,
    description: {
        pattern:
            /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
        greedy: !0,
        alias: 'string',
        inside: {
            'language-markdown': {
                pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
                lookbehind: !0,
                inside: Prism.languages.markdown,
            },
        },
    },
    string: {
        pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
        greedy: !0,
    },
    number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    boolean: /\b(?:true|false)\b/,
    variable: /\$[a-z_]\w*/i,
    directive: { pattern: /@[a-z_]\w*/i, alias: 'function' },
    'attr-name': {
        pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
        greedy: !0,
    },
    'class-name': {
        pattern:
            /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*)[a-zA-Z_]\w*/,
        lookbehind: !0,
    },
    fragment: {
        pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
        lookbehind: !0,
        alias: 'function',
    },
    keyword:
        /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
    operator: /[!=|&]|\.{3}/,
    punctuation: /[!(){}\[\]:=,]/,
    constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/,
}
;(Prism.languages.groovy = Prism.languages.extend('clike', {
    string: [
        {
            pattern:
                /("""|''')(?:[^\\]|\\[\s\S])*?\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/,
            greedy: !0,
        },
        { pattern: /(["'/])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    ],
    keyword:
        /\b(?:as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
    number: /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?[\d]+)?)[glidf]?\b/i,
    operator: {
        pattern:
            /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
        lookbehind: !0,
    },
    punctuation: /\.+|[{}[\];(),:$]/,
})),
    Prism.languages.insertBefore('groovy', 'string', {
        shebang: { pattern: /#!.+/, alias: 'comment' },
    }),
    Prism.languages.insertBefore('groovy', 'punctuation', {
        'spock-block': /\b(?:setup|given|when|then|and|cleanup|expect|where):/,
    }),
    Prism.languages.insertBefore('groovy', 'function', {
        annotation: {
            pattern: /(^|[^.])@\w+/,
            lookbehind: !0,
            alias: 'punctuation',
        },
    }),
    Prism.hooks.add('wrap', function (e) {
        if ('groovy' === e.language && 'string' === e.type) {
            var t = e.content[0]
            if ("'" != t) {
                var n = /([^\\])(?:\$(?:\{.*?\}|[\w.]+))/
                '$' === t && (n = /([^\$])(?:\$(?:\{.*?\}|[\w.]+))/),
                    (e.content = e.content
                        .replace(/&lt;/g, '<')
                        .replace(/&amp;/g, '&')),
                    (e.content = Prism.highlight(e.content, {
                        expression: {
                            pattern: n,
                            lookbehind: !0,
                            inside: Prism.languages.groovy,
                        },
                    })),
                    e.classes.push('/' === t ? 'regex' : 'gstring')
            }
        }
    })
!(function (e) {
    e.languages.ruby = e.languages.extend('clike', {
        comment: [/#.*/, { pattern: /^=begin\s[\s\S]*?^=end/m, greedy: !0 }],
        'class-name': {
            pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: { punctuation: /[.\\]/ },
        },
        keyword:
            /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
    })
    var n = {
        pattern: /#\{[^}]+\}/,
        inside: {
            delimiter: { pattern: /^#\{|\}$/, alias: 'tag' },
            rest: e.languages.ruby,
        },
    }
    delete e.languages.ruby.function,
        e.languages.insertBefore('ruby', 'keyword', {
            regex: [
                {
                    pattern: RegExp(
                        '%r(?:' +
                            [
                                '([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1[gim]{0,3}',
                                '\\((?:[^()\\\\]|\\\\[^])*\\)[gim]{0,3}',
                                '\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}[gim]{0,3}',
                                '\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\][gim]{0,3}',
                                '<(?:[^<>\\\\]|\\\\[^])*>[gim]{0,3}',
                            ].join('|') +
                            ')'
                    ),
                    greedy: !0,
                    inside: { interpolation: n },
                },
                {
                    pattern:
                        /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
                    lookbehind: !0,
                    greedy: !0,
                },
            ],
            variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
            symbol: {
                pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
                lookbehind: !0,
            },
            'method-definition': {
                pattern: /(\bdef\s+)[\w.]+/,
                lookbehind: !0,
                inside: { function: /\w+$/, rest: e.languages.ruby },
            },
        }),
        e.languages.insertBefore('ruby', 'number', {
            builtin:
                /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
            constant: /\b[A-Z]\w*(?:[?!]|\b)/,
        }),
        (e.languages.ruby.string = [
            {
                pattern: RegExp(
                    '%[qQiIwWxs]?(?:' +
                        [
                            '([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1',
                            '\\((?:[^()\\\\]|\\\\[^])*\\)',
                            '\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}',
                            '\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\]',
                            '<(?:[^<>\\\\]|\\\\[^])*>',
                        ].join('|') +
                        ')'
                ),
                greedy: !0,
                inside: { interpolation: n },
            },
            {
                pattern:
                    /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
                greedy: !0,
                inside: { interpolation: n },
            },
        ]),
        (e.languages.rb = e.languages.ruby)
})(Prism)
!(function (e) {
    e.languages.haml = {
        'multiline-comment': {
            pattern:
                /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ].+)*/,
            lookbehind: !0,
            alias: 'comment',
        },
        'multiline-code': [
            {
                pattern:
                    /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ].*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ].+)/,
                lookbehind: !0,
                inside: e.languages.ruby,
            },
            {
                pattern:
                    /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ].*\|[\t ]*)*/,
                lookbehind: !0,
                inside: e.languages.ruby,
            },
        ],
        filter: {
            pattern:
                /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/,
            lookbehind: !0,
            inside: {
                'filter-name': { pattern: /^:[\w-]+/, alias: 'variable' },
            },
        },
        markup: {
            pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
            lookbehind: !0,
            inside: e.languages.markup,
        },
        doctype: {
            pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/,
            lookbehind: !0,
        },
        tag: {
            pattern:
                /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^{}])+\}|\[[^\]]+\])*[\/<>]*/,
            lookbehind: !0,
            inside: {
                attributes: [
                    {
                        pattern: /(^|[^#])\{(?:\{[^}]+\}|[^{}])+\}/,
                        lookbehind: !0,
                        inside: e.languages.ruby,
                    },
                    {
                        pattern: /\([^)]+\)/,
                        inside: {
                            'attr-value': {
                                pattern:
                                    /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
                                lookbehind: !0,
                            },
                            'attr-name': /[\w:-]+(?=\s*!?=|\s*[,)])/,
                            punctuation: /[=(),]/,
                        },
                    },
                    { pattern: /\[[^\]]+\]/, inside: e.languages.ruby },
                ],
                punctuation: /[<>]/,
            },
        },
        code: {
            pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
            lookbehind: !0,
            inside: e.languages.ruby,
        },
        interpolation: {
            pattern: /#\{[^}]+\}/,
            inside: {
                delimiter: { pattern: /^#\{|\}$/, alias: 'punctuation' },
                rest: e.languages.ruby,
            },
        },
        punctuation: {
            pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/,
            lookbehind: !0,
        },
    }
    for (
        var t = [
                'css',
                { filter: 'coffee', language: 'coffeescript' },
                'erb',
                'javascript',
                'less',
                'markdown',
                'ruby',
                'scss',
                'textile',
            ],
            n = {},
            r = 0,
            a = t.length;
        r < a;
        r++
    ) {
        var i = t[r]
        ;(i = 'string' == typeof i ? { filter: i, language: i } : i),
            e.languages[i.language] &&
                (n['filter-' + i.filter] = {
                    pattern: RegExp(
                        '((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ].+|\\s*?(?=\\r?\\n|\\r)))+'.replace(
                            '{{filter_name}}',
                            function () {
                                return i.filter
                            }
                        )
                    ),
                    lookbehind: !0,
                    inside: {
                        'filter-name': {
                            pattern: /^:[\w-]+/,
                            alias: 'variable',
                        },
                        rest: e.languages[i.language],
                    },
                })
    }
    e.languages.insertBefore('haml', 'filter', n)
})(Prism)
!(function (e) {
    ;(e.languages.handlebars = {
        comment: /\{\{![\s\S]*?\}\}/,
        delimiter: { pattern: /^\{\{\{?|\}\}\}?$/i, alias: 'punctuation' },
        string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
        number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
        boolean: /\b(?:true|false)\b/,
        block: {
            pattern: /^(\s*(?:~\s*)?)[#\/]\S+?(?=\s*(?:~\s*)?$|\s)/i,
            lookbehind: !0,
            alias: 'keyword',
        },
        brackets: {
            pattern: /\[[^\]]+\]/,
            inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ },
        },
        punctuation: /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
        variable: /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/,
    }),
        e.hooks.add('before-tokenize', function (a) {
            e.languages['markup-templating'].buildPlaceholders(
                a,
                'handlebars',
                /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g
            )
        }),
        e.hooks.add('after-tokenize', function (a) {
            e.languages['markup-templating'].tokenizePlaceholders(
                a,
                'handlebars'
            )
        })
})(Prism)
;(Prism.languages.haskell = {
    comment: {
        pattern:
            /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--(?:(?=.)[^-!#$%*+=?&@|~.:<>^\\\/].*|$)|{-[\s\S]*?-})/m,
        lookbehind: !0,
    },
    char: {
        pattern:
            /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
        alias: 'string',
    },
    string: { pattern: /"(?:[^\\"]|\\(?:\S|\s+\\))*"/, greedy: !0 },
    keyword:
        /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
    'import-statement': {
        pattern:
            /(^\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
        lookbehind: !0,
        inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ },
    },
    builtin:
        /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
    number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
    operator:
        /\s\.\s|[-!#$%*+=?&@|~:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/,
    hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
    constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
    punctuation: /[{}[\];(),.:]/,
}),
    (Prism.languages.hs = Prism.languages.haskell)
!(function (t) {
    t.languages.http = {
        'request-line': {
            pattern:
                /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
            inside: {
                property:
                    /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
                'attr-name': /:\w+/,
            },
        },
        'response-status': {
            pattern: /^HTTP\/1.[01] \d.*/m,
            inside: {
                property: { pattern: /(^HTTP\/1.[01] )\d.*/i, lookbehind: !0 },
            },
        },
        'header-name': { pattern: /^[\w-]+:(?=.)/m, alias: 'keyword' },
    }
    var a,
        e,
        n,
        i = t.languages,
        p = {
            'application/javascript': i.javascript,
            'application/json': i.json || i.javascript,
            'application/xml': i.xml,
            'text/xml': i.xml,
            'text/html': i.html,
            'text/css': i.css,
        },
        r = { 'application/json': !0, 'application/xml': !0 }
    for (var s in p)
        if (p[s]) {
            a = a || {}
            var T = r[s]
                ? (void 0,
                  (n = (e = s).replace(/^[a-z]+\//, '')),
                  '(?:' + e + '|\\w+/(?:[\\w.-]+\\+)+' + n + '(?![+\\w.-]))')
                : s
            a[s.replace(/\//g, '-')] = {
                pattern: RegExp(
                    '(content-type:\\s*' + T + '.*)(?:\\r?\\n|\\r){2}[\\s\\S]*',
                    'i'
                ),
                lookbehind: !0,
                inside: p[s],
            }
        }
    a && t.languages.insertBefore('http', 'header-name', a)
})(Prism)
Prism.languages.hpkp = {
    directive: {
        pattern:
            /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=/]+"|(?:max-age|report-uri)=|report-to )/,
        alias: 'keyword',
    },
    safe: { pattern: /\b\d{7,}\b/, alias: 'selector' },
    unsafe: { pattern: /\b\d{1,6}\b/, alias: 'function' },
}
Prism.languages.hsts = {
    directive: {
        pattern: /\b(?:max-age=|includeSubDomains|preload)/,
        alias: 'keyword',
    },
    safe: { pattern: /\b\d{8,}\b/, alias: 'selector' },
    unsafe: { pattern: /\b\d{1,7}\b/, alias: 'function' },
}
Prism.languages.ini = {
    comment: /^[ \t]*[;#].*$/m,
    selector: /^[ \t]*\[.*?\]/m,
    constant: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m,
    'attr-value': { pattern: /=.*/, inside: { punctuation: /^[=]/ } },
}
!(function (e) {
    var t =
            /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
        n = '(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*',
        a = {
            pattern: RegExp(n + '[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b'),
            lookbehind: !0,
            inside: {
                namespace: {
                    pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
                    inside: { punctuation: /\./ },
                },
                punctuation: /\./,
            },
        }
    ;(e.languages.java = e.languages.extend('clike', {
        'class-name': [
            a,
            {
                pattern: RegExp(n + '[A-Z]\\w*(?=\\s+\\w+\\s*[;,=())])'),
                lookbehind: !0,
                inside: a.inside,
            },
        ],
        keyword: t,
        function: [
            e.languages.clike.function,
            { pattern: /(\:\:\s*)[a-z_]\w*/, lookbehind: !0 },
        ],
        number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
        operator: {
            pattern:
                /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
            lookbehind: !0,
        },
    })),
        e.languages.insertBefore('java', 'string', {
            'triple-quoted-string': {
                pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
                greedy: !0,
                alias: 'string',
            },
        }),
        e.languages.insertBefore('java', 'class-name', {
            annotation: {
                pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
                lookbehind: !0,
                alias: 'punctuation',
            },
            generics: {
                pattern:
                    /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
                inside: {
                    'class-name': a,
                    keyword: t,
                    punctuation: /[<>(),.:]/,
                    operator: /[?&|]/,
                },
            },
            namespace: {
                pattern: RegExp(
                    '(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?'.replace(
                        /<keyword>/g,
                        function () {
                            return t.source
                        }
                    )
                ),
                lookbehind: !0,
                inside: { punctuation: /\./ },
            },
        })
})(Prism)
!(function (a) {
    var e = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
        t = [
            { pattern: /\b(?:false|true)\b/i, alias: 'boolean' },
            /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/,
            /\b(?:null)\b/i,
        ],
        i =
            /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        n =
            /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
        s = /[{}\[\](),:;]/
    a.languages.php = {
        delimiter: {
            pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
            alias: 'important',
        },
        comment: e,
        variable: /\$+(?:\w+\b|(?={))/i,
        package: {
            pattern:
                /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
            lookbehind: !0,
            inside: { punctuation: /\\/ },
        },
        keyword: [
            {
                pattern:
                    /(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i,
                alias: 'type-casting',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern:
                    /([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,
                alias: 'type-hint',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /([(,?]\s*[a-z0-9_|]\|\s*)(?:null|false)\b(?=\s*\$)/i,
                alias: 'type-hint',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern:
                    /(\)\s*:\s*(?:\?\s*)?)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,
                alias: 'return-type',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern:
                    /(\)\s*:\s*(?:\?\s*)?[a-z0-9_|]\|\s*)(?:null|false)\b/i,
                alias: 'return-type',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern:
                    /\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i,
                alias: 'type-declaration',
                greedy: !0,
            },
            {
                pattern: /(\|\s*)(?:null|false)\b/i,
                alias: 'type-declaration',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /\b(?:parent|self|static)(?=\s*::)/i,
                alias: 'static-context',
                greedy: !0,
            },
            /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
        ],
        'argument-name': /\b[a-z_]\w*(?=\s*:(?!:))/i,
        'class-name': [
            {
                pattern:
                    /(\b(?:class|interface|extends|implements|trait|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
                greedy: !0,
                lookbehind: !0,
            },
            { pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 },
            {
                pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
                alias: 'class-name-fully-qualified',
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
                alias: 'class-name-fully-qualified',
                greedy: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern:
                    /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
                alias: 'class-name-fully-qualified',
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /\b[a-z_]\w*(?=\s*\$)/i,
                alias: 'type-declaration',
                greedy: !0,
            },
            {
                pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
                alias: ['class-name-fully-qualified', 'type-declaration'],
                greedy: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /\b[a-z_]\w*(?=\s*::)/i,
                alias: 'static-context',
                greedy: !0,
            },
            {
                pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
                alias: ['class-name-fully-qualified', 'static-context'],
                greedy: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
                alias: 'type-hint',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
                alias: ['class-name-fully-qualified', 'type-hint'],
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
            },
            {
                pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
                alias: 'return-type',
                greedy: !0,
                lookbehind: !0,
            },
            {
                pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
                alias: ['class-name-fully-qualified', 'return-type'],
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
            },
        ],
        constant: t,
        function: /\w+\s*(?=\()/,
        property: { pattern: /(->)[\w]+/, lookbehind: !0 },
        number: i,
        operator: n,
        punctuation: s,
    }
    var l = {
            pattern:
                /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
            lookbehind: !0,
            inside: a.languages.php,
        },
        r = [
            {
                pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
                alias: 'nowdoc-string',
                greedy: !0,
                inside: {
                    delimiter: {
                        pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                        alias: 'symbol',
                        inside: { punctuation: /^<<<'?|[';]$/ },
                    },
                },
            },
            {
                pattern:
                    /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
                alias: 'heredoc-string',
                greedy: !0,
                inside: {
                    delimiter: {
                        pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                        alias: 'symbol',
                        inside: { punctuation: /^<<<"?|[";]$/ },
                    },
                    interpolation: l,
                },
            },
            {
                pattern: /`(?:\\[\s\S]|[^\\`])*`/,
                alias: 'backtick-quoted-string',
                greedy: !0,
            },
            {
                pattern: /'(?:\\[\s\S]|[^\\'])*'/,
                alias: 'single-quoted-string',
                greedy: !0,
            },
            {
                pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                alias: 'double-quoted-string',
                greedy: !0,
                inside: { interpolation: l },
            },
        ]
    a.languages.insertBefore('php', 'variable', { string: r }),
        a.languages.insertBefore('php', 'variable', {
            attribute: {
                pattern:
                    /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
                greedy: !0,
                inside: {
                    'attribute-content': {
                        pattern: /^(#\[)[\s\S]+(?=]$)/,
                        lookbehind: !0,
                        inside: {
                            comment: e,
                            string: r,
                            'attribute-class-name': [
                                {
                                    pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                                    alias: 'class-name',
                                    greedy: !0,
                                    lookbehind: !0,
                                },
                                {
                                    pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                                    alias: [
                                        'class-name',
                                        'class-name-fully-qualified',
                                    ],
                                    greedy: !0,
                                    lookbehind: !0,
                                    inside: { punctuation: /\\/ },
                                },
                            ],
                            constant: t,
                            number: i,
                            operator: n,
                            punctuation: s,
                        },
                    },
                    delimiter: { pattern: /^#\[|]$/, alias: 'punctuation' },
                },
            },
        }),
        a.hooks.add('before-tokenize', function (e) {
            if (/<\?/.test(e.code)) {
                a.languages['markup-templating'].buildPlaceholders(
                    e,
                    'php',
                    /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/gi
                )
            }
        }),
        a.hooks.add('after-tokenize', function (e) {
            a.languages['markup-templating'].tokenizePlaceholders(e, 'php')
        })
})(Prism)
!(function (p) {
    var a = (p.languages.javadoclike = {
        parameter: {
            pattern:
                /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m,
            lookbehind: !0,
        },
        keyword: {
            pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
            lookbehind: !0,
        },
        punctuation: /[{}]/,
    })
    Object.defineProperty(a, 'addSupport', {
        value: function (a, e) {
            'string' == typeof a && (a = [a]),
                a.forEach(function (a) {
                    !(function (a, e) {
                        var n = 'doc-comment',
                            t = p.languages[a]
                        if (t) {
                            var r = t[n]
                            if (!r) {
                                var o = {
                                    'doc-comment': {
                                        pattern:
                                            /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
                                        lookbehind: !0,
                                        alias: 'comment',
                                    },
                                }
                                r = (t = p.languages.insertBefore(
                                    a,
                                    'comment',
                                    o
                                ))[n]
                            }
                            if (
                                (r instanceof RegExp &&
                                    (r = t[n] = { pattern: r }),
                                Array.isArray(r))
                            )
                                for (var i = 0, s = r.length; i < s; i++)
                                    r[i] instanceof RegExp &&
                                        (r[i] = { pattern: r[i] }),
                                        e(r[i])
                            else e(r)
                        }
                    })(a, function (a) {
                        a.inside || (a.inside = {}), (a.inside.rest = e)
                    })
                })
        },
    }),
        a.addSupport(['java', 'javascript', 'php'], a)
})(Prism)
!(function (a) {
    var e = /(^(?:\s*(?:\*\s*)*))[^*\s].*$/m,
        n = '(?:[a-zA-Z]\\w+\\s*\\.\\s*)*[A-Z]\\w*(?:\\s*<mem>)?|<mem>'.replace(
            /<mem>/g,
            function () {
                return '#\\s*\\w+(?:\\s*\\([^()]*\\))?'
            }
        )
    ;(a.languages.javadoc = a.languages.extend('javadoclike', {})),
        a.languages.insertBefore('javadoc', 'keyword', {
            reference: {
                pattern: RegExp(
                    '(@(?:exception|throws|see|link|linkplain|value)\\s+(?:\\*\\s*)?)(?:' +
                        n +
                        ')'
                ),
                lookbehind: !0,
                inside: {
                    function: { pattern: /(#\s*)\w+(?=\s*\()/, lookbehind: !0 },
                    field: { pattern: /(#\s*)\w+/, lookbehind: !0 },
                    namespace: {
                        pattern: /\b(?:[a-z]\w*\s*\.\s*)+/,
                        inside: { punctuation: /\./ },
                    },
                    'class-name': /\b[A-Z]\w*/,
                    keyword: a.languages.java.keyword,
                    punctuation: /[#()[\],.]/,
                },
            },
            'class-name': {
                pattern: /(@param\s+)<[A-Z]\w*>/,
                lookbehind: !0,
                inside: { punctuation: /[.<>]/ },
            },
            'code-section': [
                {
                    pattern:
                        /(\{@code\s+(?!\s))(?:[^\s{}]|\s+(?![\s}])|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})+(?=\s*\})/,
                    lookbehind: !0,
                    inside: {
                        code: {
                            pattern: e,
                            lookbehind: !0,
                            inside: a.languages.java,
                            alias: 'language-java',
                        },
                    },
                },
                {
                    pattern:
                        /(<(code|pre|tt)>(?!<code>)\s*)\S(?:\S|\s+\S)*?(?=\s*<\/\2>)/,
                    lookbehind: !0,
                    inside: {
                        line: {
                            pattern: e,
                            lookbehind: !0,
                            inside: {
                                tag: a.languages.markup.tag,
                                entity: a.languages.markup.entity,
                                code: {
                                    pattern: /.+/,
                                    inside: a.languages.java,
                                    alias: 'language-java',
                                },
                            },
                        },
                    },
                },
            ],
            tag: a.languages.markup.tag,
            entity: a.languages.markup.entity,
        }),
        a.languages.javadoclike.addSupport('java', a.languages.javadoc)
})(Prism)
!(function (e) {
    ;(e.languages.typescript = e.languages.extend('javascript', {
        'class-name': {
            pattern:
                /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
            lookbehind: !0,
            greedy: !0,
            inside: null,
        },
        keyword:
            /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
        builtin:
            /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
    })),
        delete e.languages.typescript.parameter
    var n = e.languages.extend('typescript', {})
    delete n['class-name'],
        (e.languages.typescript['class-name'].inside = n),
        e.languages.insertBefore('typescript', 'function', {
            'generic-function': {
                pattern:
                    /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
                greedy: !0,
                inside: {
                    function:
                        /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
                    generic: {
                        pattern: /<[\s\S]+/,
                        alias: 'class-name',
                        inside: n,
                    },
                },
            },
        }),
        (e.languages.ts = e.languages.typescript)
})(Prism)
!(function (e) {
    var a = e.languages.javascript,
        n = '{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})+}',
        s = '(@(?:param|arg|argument|property)\\s+(?:' + n + '\\s+)?)'
    ;(e.languages.jsdoc = e.languages.extend('javadoclike', {
        parameter: {
            pattern: RegExp(s + '(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?=\\s|$)'),
            lookbehind: !0,
            inside: { punctuation: /\./ },
        },
    })),
        e.languages.insertBefore('jsdoc', 'keyword', {
            'optional-parameter': {
                pattern: RegExp(
                    s +
                        '\\[(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?:=[^[\\]]+)?\\](?=\\s|$)'
                ),
                lookbehind: !0,
                inside: {
                    parameter: {
                        pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/,
                        lookbehind: !0,
                        inside: { punctuation: /\./ },
                    },
                    code: {
                        pattern: /(=)[\s\S]*(?=\]$)/,
                        lookbehind: !0,
                        inside: a,
                        alias: 'language-javascript',
                    },
                    punctuation: /[=[\]]/,
                },
            },
            'class-name': [
                {
                    pattern: RegExp(
                        '(@(?:augments|extends|class|interface|memberof!?|template|this|typedef)\\s+(?:<TYPE>\\s+)?)[A-Z]\\w*(?:\\.[A-Z]\\w*)*'.replace(
                            /<TYPE>/g,
                            function () {
                                return n
                            }
                        )
                    ),
                    lookbehind: !0,
                    inside: { punctuation: /\./ },
                },
                {
                    pattern: RegExp('(@[a-z]+\\s+)' + n),
                    lookbehind: !0,
                    inside: {
                        string: a.string,
                        number: a.number,
                        boolean: a.boolean,
                        keyword: e.languages.typescript.keyword,
                        operator: /=>|\.\.\.|[&|?:*]/,
                        punctuation: /[.,;=<>{}()[\]]/,
                    },
                },
            ],
            example: {
                pattern:
                    /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
                lookbehind: !0,
                inside: {
                    code: {
                        pattern: /^(\s*(?:\*\s*)?)\S.*$/m,
                        lookbehind: !0,
                        inside: a,
                        alias: 'language-javascript',
                    },
                },
            },
        }),
        e.languages.javadoclike.addSupport('javascript', e.languages.jsdoc)
})(Prism)
!(function (a) {
    function e(a, e) {
        return RegExp(
            a.replace(/<ID>/g, function () {
                return '(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*'
            }),
            e
        )
    }
    a.languages.insertBefore('javascript', 'function-variable', {
        'method-variable': {
            pattern: RegExp(
                '(\\.\\s*)' +
                    a.languages.javascript['function-variable'].pattern.source
            ),
            lookbehind: !0,
            alias: [
                'function-variable',
                'method',
                'function',
                'property-access',
            ],
        },
    }),
        a.languages.insertBefore('javascript', 'function', {
            method: {
                pattern: RegExp(
                    '(\\.\\s*)' + a.languages.javascript.function.source
                ),
                lookbehind: !0,
                alias: ['function', 'property-access'],
            },
        }),
        a.languages.insertBefore('javascript', 'constant', {
            'known-class-name': [
                {
                    pattern:
                        /\b(?:(?:(?:Uint|Int)(?:8|16|32)|Uint8Clamped|Float(?:32|64))?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|(?:Weak)?(?:Set|Map)|WebAssembly)\b/,
                    alias: 'class-name',
                },
                { pattern: /\b(?:[A-Z]\w*)Error\b/, alias: 'class-name' },
            ],
        }),
        a.languages.insertBefore('javascript', 'keyword', {
            imports: {
                pattern: e(
                    '(\\bimport\\b\\s*)(?:<ID>(?:\\s*,\\s*(?:\\*\\s*as\\s+<ID>|\\{[^{}]*\\}))?|\\*\\s*as\\s+<ID>|\\{[^{}]*\\})(?=\\s*\\bfrom\\b)'
                ),
                lookbehind: !0,
                inside: a.languages.javascript,
            },
            exports: {
                pattern: e(
                    '(\\bexport\\b\\s*)(?:\\*(?:\\s*as\\s+<ID>)?(?=\\s*\\bfrom\\b)|\\{[^{}]*\\})'
                ),
                lookbehind: !0,
                inside: a.languages.javascript,
            },
        }),
        a.languages.javascript.keyword.unshift(
            {
                pattern: /\b(?:as|default|export|from|import)\b/,
                alias: 'module',
            },
            {
                pattern:
                    /\b(?:await|break|catch|continue|do|else|for|finally|if|return|switch|throw|try|while|yield)\b/,
                alias: 'control-flow',
            },
            { pattern: /\bnull\b/, alias: ['null', 'nil'] },
            { pattern: /\bundefined\b/, alias: 'nil' }
        ),
        a.languages.insertBefore('javascript', 'operator', {
            spread: { pattern: /\.{3}/, alias: 'operator' },
            arrow: { pattern: /=>/, alias: 'operator' },
        }),
        a.languages.insertBefore('javascript', 'punctuation', {
            'property-access': {
                pattern: e('(\\.\\s*)#?<ID>'),
                lookbehind: !0,
            },
            'maybe-class-name': {
                pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
                lookbehind: !0,
            },
            dom: {
                pattern:
                    /\b(?:document|location|navigator|performance|(?:local|session)Storage|window)\b/,
                alias: 'variable',
            },
            console: { pattern: /\bconsole(?=\s*\.)/, alias: 'class-name' },
        })
    for (
        var t = [
                'function',
                'function-variable',
                'method',
                'method-variable',
                'property-access',
            ],
            r = 0;
        r < t.length;
        r++
    ) {
        var n = t[r],
            s = a.languages.javascript[n]
        'RegExp' === a.util.type(s) &&
            (s = a.languages.javascript[n] = { pattern: s })
        var o = s.inside || {}
        ;(s.inside = o)['maybe-class-name'] = /^[A-Z][\s\S]*/
    }
})(Prism)
;(Prism.languages.json = {
    property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: !0,
        greedy: !0,
    },
    string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: !0,
        greedy: !0,
    },
    comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: 'keyword' },
}),
    (Prism.languages.webmanifest = Prism.languages.json)
!(function (n) {
    var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/
    n.languages.json5 = n.languages.extend('json', {
        property: [
            { pattern: RegExp(e.source + '(?=\\s*:)'), greedy: !0 },
            {
                pattern:
                    /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
                alias: 'unquoted',
            },
        ],
        string: { pattern: e, greedy: !0 },
        number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
    })
})(Prism)
;(Prism.languages.jsonp = Prism.languages.extend('json', {
    punctuation: /[{}[\]();,.]/,
})),
    Prism.languages.insertBefore('jsonp', 'punctuation', {
        function:
            /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/,
    })
Prism.languages.julia = {
    comment: {
        pattern:
            /(^|[^\\])(?:#=(?:[^#=]|=(?!#)|#(?!=)|#=(?:[^#=]|=(?!#)|#(?!=))*=#)*=#|#.*)/,
        lookbehind: !0,
    },
    regex: { pattern: /r"(?:\\.|[^"\\\r\n])*"[imsx]{0,4}/, greedy: !0 },
    string: {
        pattern:
            /"""[\s\S]+?"""|\w*"(?:\\.|[^"\\\r\n])*"|(^|[^\w'])'(?:\\[^\r\n][^'\r\n]*|[^\\\r\n])'|`(?:[^\\`\r\n]|\\.)*`/,
        lookbehind: !0,
        greedy: !0,
    },
    keyword:
        /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,
    boolean: /\b(?:true|false)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+(?:_[\da-f]+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[efp][+-]?\d+(?:_\d+)*)?j?/i,
    operator:
        /&&|\|\||[-+*^%÷⊻&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:|])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥'√∛]/,
    punctuation: /::?|[{}[\]();,.?]/,
    constant: /\b(?:(?:NaN|Inf)(?:16|32|64)?|im|pi)\b|[πℯ]/,
}
!(function (e) {
    ;(e.languages.kotlin = e.languages.extend('clike', {
        keyword: {
            pattern:
                /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
            lookbehind: !0,
        },
        function: [
            { pattern: /(?:`[^\r\n`]+`|\w+)(?=\s*\()/, greedy: !0 },
            {
                pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/,
                lookbehind: !0,
                greedy: !0,
            },
        ],
        number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
        operator:
            /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
    })),
        delete e.languages.kotlin['class-name'],
        e.languages.insertBefore('kotlin', 'string', {
            'raw-string': { pattern: /("""|''')[\s\S]*?\1/, alias: 'string' },
        }),
        e.languages.insertBefore('kotlin', 'keyword', {
            annotation: {
                pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
                alias: 'builtin',
            },
        }),
        e.languages.insertBefore('kotlin', 'function', {
            label: { pattern: /\w+@|@\w+/, alias: 'symbol' },
        })
    var n = [
        {
            pattern: /\$\{[^}]+\}/,
            inside: {
                delimiter: { pattern: /^\$\{|\}$/, alias: 'variable' },
                rest: e.languages.kotlin,
            },
        },
        { pattern: /\$\w+/, alias: 'variable' },
    ]
    ;(e.languages.kotlin.string.inside = e.languages.kotlin[
        'raw-string'
    ].inside =
        { interpolation: n }),
        (e.languages.kt = e.languages.kotlin),
        (e.languages.kts = e.languages.kotlin)
})(Prism)
!(function (a) {
    var e = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
        n = { 'equation-command': { pattern: e, alias: 'regex' } }
    ;(a.languages.latex = {
        comment: /%.*/m,
        cdata: {
            pattern:
                /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
            lookbehind: !0,
        },
        equation: [
            {
                pattern:
                    /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
                inside: n,
                alias: 'string',
            },
            {
                pattern:
                    /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
                lookbehind: !0,
                inside: n,
                alias: 'string',
            },
        ],
        keyword: {
            pattern:
                /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
            lookbehind: !0,
        },
        url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
        headline: {
            pattern:
                /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
            lookbehind: !0,
            alias: 'class-name',
        },
        function: { pattern: e, alias: 'selector' },
        punctuation: /[[\]{}&]/,
    }),
        (a.languages.tex = a.languages.latex),
        (a.languages.context = a.languages.latex)
})(Prism)
;(Prism.languages.less = Prism.languages.extend('css', {
    comment: [
        /\/\*[\s\S]*?\*\//,
        { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 },
    ],
    atrule: {
        pattern:
            /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
        inside: { punctuation: /[:()]/ },
    },
    selector: {
        pattern:
            /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
        inside: { variable: /@+[\w-]+/ },
    },
    property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
    operator: /[+\-*\/]/,
})),
    Prism.languages.insertBefore('less', 'property', {
        variable: [
            { pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } },
            /@@?[\w-]+/,
        ],
        'mixin-usage': {
            pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
            lookbehind: !0,
            alias: 'function',
        },
    })
!(function (e) {
    function n(e) {
        return RegExp('(\\()' + e + '(?=[\\s\\)])')
    }
    function a(e) {
        return RegExp('([\\s([])' + e + '(?=[\\s)])')
    }
    var t = '[-+*/_~!@$%^=<>{}\\w]+',
        r = '(\\()',
        s = '(?=\\))',
        i = '(?=\\s)',
        o = {
            heading: { pattern: /;;;.*/, alias: ['comment', 'title'] },
            comment: /;.*/,
            string: {
                pattern: /"(?:[^"\\]|\\.)*"/,
                greedy: !0,
                inside: {
                    argument: /[-A-Z]+(?=[.,\s])/,
                    symbol: RegExp('`' + t + "'"),
                },
            },
            'quoted-symbol': {
                pattern: RegExp("#?'" + t),
                alias: ['variable', 'symbol'],
            },
            'lisp-property': { pattern: RegExp(':' + t), alias: 'property' },
            splice: {
                pattern: RegExp(',@?' + t),
                alias: ['symbol', 'variable'],
            },
            keyword: [
                {
                    pattern: RegExp(
                        r +
                            '(?:(?:lexical-)?let\\*?|(?:cl-)?letf|if|when|while|unless|cons|cl-loop|and|or|not|cond|setq|error|message|null|require|provide|use-package)' +
                            i
                    ),
                    lookbehind: !0,
                },
                {
                    pattern: RegExp(
                        r +
                            '(?:for|do|collect|return|finally|append|concat|in|by)' +
                            i
                    ),
                    lookbehind: !0,
                },
            ],
            declare: {
                pattern: n('declare'),
                lookbehind: !0,
                alias: 'keyword',
            },
            interactive: {
                pattern: n('interactive'),
                lookbehind: !0,
                alias: 'keyword',
            },
            boolean: { pattern: a('(?:t|nil)'), lookbehind: !0 },
            number: { pattern: a('[-+]?\\d+(?:\\.\\d*)?'), lookbehind: !0 },
            defvar: {
                pattern: RegExp(r + 'def(?:var|const|custom|group)\\s+' + t),
                lookbehind: !0,
                inside: { keyword: /^def[a-z]+/, variable: RegExp(t) },
            },
            defun: {
                pattern: RegExp(
                    r +
                        '(?:cl-)?(?:defun\\*?|defmacro)\\s+' +
                        t +
                        '\\s+\\([\\s\\S]*?\\)'
                ),
                lookbehind: !0,
                inside: {
                    keyword: /^(?:cl-)?def\S+/,
                    arguments: null,
                    function: { pattern: RegExp('(^\\s)' + t), lookbehind: !0 },
                    punctuation: /[()]/,
                },
            },
            lambda: {
                pattern: RegExp(
                    r +
                        'lambda\\s+\\(\\s*(?:&?' +
                        t +
                        '(?:\\s+&?' +
                        t +
                        ')*\\s*)?\\)'
                ),
                lookbehind: !0,
                inside: {
                    keyword: /^lambda/,
                    arguments: null,
                    punctuation: /[()]/,
                },
            },
            car: { pattern: RegExp(r + t), lookbehind: !0 },
            punctuation: [
                /(?:['`,]?\(|[)\[\]])/,
                { pattern: /(\s)\.(?=\s)/, lookbehind: !0 },
            ],
        },
        l = {
            'lisp-marker': RegExp('&[-+*/_~!@$%^=<>{}\\w]+'),
            rest: {
                argument: { pattern: RegExp(t), alias: 'variable' },
                varform: {
                    pattern: RegExp(r + t + '\\s+\\S[\\s\\S]*' + s),
                    lookbehind: !0,
                    inside: {
                        string: o.string,
                        boolean: o.boolean,
                        number: o.number,
                        symbol: o.symbol,
                        punctuation: /[()]/,
                    },
                },
            },
        },
        p = '\\S+(?:\\s+\\S+)*',
        d = {
            pattern: RegExp(r + '[\\s\\S]*' + s),
            lookbehind: !0,
            inside: {
                'rest-vars': {
                    pattern: RegExp('&(?:rest|body)\\s+' + p),
                    inside: l,
                },
                'other-marker-vars': {
                    pattern: RegExp('&(?:optional|aux)\\s+' + p),
                    inside: l,
                },
                keys: {
                    pattern: RegExp(
                        '&key\\s+' + p + '(?:\\s+&allow-other-keys)?'
                    ),
                    inside: l,
                },
                argument: { pattern: RegExp(t), alias: 'variable' },
                punctuation: /[()]/,
            },
        }
    ;(o.lambda.inside.arguments = d),
        (o.defun.inside.arguments = e.util.clone(d)),
        (o.defun.inside.arguments.inside.sublist = d),
        (e.languages.lisp = o),
        (e.languages.elisp = o),
        (e.languages.emacs = o),
        (e.languages['emacs-lisp'] = o)
})(Prism)
Prism.languages.matlab = {
    comment: [/%\{[\s\S]*?\}%/, /%.+/],
    string: { pattern: /\B'(?:''|[^'\r\n])*'/, greedy: !0 },
    number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
    keyword:
        /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
    function: /(?!\d)\w+(?=\s*\()/,
    operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
    punctuation: /\.{3}|[.,;\[\](){}!]/,
}
;(Prism.languages.nginx = Prism.languages.extend('clike', {
    comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
    keyword:
        /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i,
})),
    Prism.languages.insertBefore('nginx', 'keyword', { variable: /\$[a-z_]+/i })
;(Prism.languages.objectivec = Prism.languages.extend('c', {
    string: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    keyword:
        /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
    operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
})),
    delete Prism.languages.objectivec['class-name'],
    (Prism.languages.objc = Prism.languages.objectivec)
Prism.languages.perl = {
    comment: [
        { pattern: /(^\s*)=\w[\s\S]*?=cut.*/m, lookbehind: !0 },
        { pattern: /(^|[^\\$])#.*/, lookbehind: !0 },
    ],
    string: [
        {
            pattern:
                /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
            greedy: !0,
        },
        {
            pattern:
                /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
            greedy: !0,
        },
        { pattern: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/, greedy: !0 },
        { pattern: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/, greedy: !0 },
        {
            pattern: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/,
            greedy: !0,
        },
        { pattern: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/, greedy: !0 },
        { pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
        { pattern: /'(?:[^'\\\r\n]|\\.)*'/, greedy: !0 },
    ],
    regex: [
        {
            pattern:
                /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern:
                /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/,
            greedy: !0,
        },
        {
            pattern:
                /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern:
                /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern:
                /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern:
                /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern:
                /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern:
                /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
            lookbehind: !0,
            greedy: !0,
        },
        {
            pattern:
                /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/,
            greedy: !0,
        },
    ],
    variable: [
        /[&*$@%]\{\^[A-Z]+\}/,
        /[&*$@%]\^[A-Z_]/,
        /[&*$@%]#?(?=\{)/,
        /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i,
        /[&*$@%]\d+/,
        /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/,
    ],
    filehandle: { pattern: /<(?![<=])\S*>|\b_\b/, alias: 'symbol' },
    vstring: { pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/, alias: 'string' },
    function: { pattern: /sub [a-z0-9_]+/i, inside: { keyword: /sub/ } },
    keyword:
        /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
    operator:
        /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
    punctuation: /[{}[\];(),:]/,
}
!(function (a) {
    var e = '(?:\\b[a-zA-Z]\\w*|[|\\\\[\\]])+'
    ;(a.languages.phpdoc = a.languages.extend('javadoclike', {
        parameter: {
            pattern: RegExp(
                '(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:' +
                    e +
                    '\\s+)?)\\$\\w+'
            ),
            lookbehind: !0,
        },
    })),
        a.languages.insertBefore('phpdoc', 'keyword', {
            'class-name': [
                {
                    pattern: RegExp(
                        '(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)' +
                            e
                    ),
                    lookbehind: !0,
                    inside: {
                        keyword:
                            /\b(?:callback|resource|boolean|integer|double|object|string|array|false|float|mixed|bool|null|self|true|void|int)\b/,
                        punctuation: /[|\\[\]()]/,
                    },
                },
            ],
        }),
        a.languages.javadoclike.addSupport('php', a.languages.phpdoc)
})(Prism)
Prism.languages.insertBefore('php', 'variable', {
    this: /\$this\b/,
    global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
    scope: {
        pattern: /\b[\w\\]+::/,
        inside: { keyword: /static|self|parent/, punctuation: /::|\\/ },
    },
})
!(function (e) {
    var i = (Prism.languages.powershell = {
            comment: [
                { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
                { pattern: /(^|[^`])#.*/, lookbehind: !0 },
            ],
            string: [
                {
                    pattern: /"(?:`[\s\S]|[^`"])*"/,
                    greedy: !0,
                    inside: {
                        function: {
                            pattern:
                                /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
                            lookbehind: !0,
                            inside: {},
                        },
                    },
                },
                { pattern: /'(?:[^']|'')*'/, greedy: !0 },
            ],
            namespace: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i,
            boolean: /\$(?:true|false)\b/i,
            variable: /\$\w+\b/,
            function: [
                /\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
                /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
            ],
            keyword:
                /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
            operator: {
                pattern:
                    /(\W?)(?:!|-(?:eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
                lookbehind: !0,
            },
            punctuation: /[|{}[\];(),.]/,
        }),
        r = i.string[0].inside
    ;(r.boolean = i.boolean), (r.variable = i.variable), (r.function.inside = i)
})()
!(function (t) {
    var n = ['on', 'ignoring', 'group_right', 'group_left', 'by', 'without'],
        a = [
            'sum',
            'min',
            'max',
            'avg',
            'group',
            'stddev',
            'stdvar',
            'count',
            'count_values',
            'bottomk',
            'topk',
            'quantile',
        ].concat(n, ['offset'])
    t.languages.promql = {
        comment: { pattern: /(^[ \t]*)#.*/m, lookbehind: !0 },
        'vector-match': {
            pattern: new RegExp('((?:' + n.join('|') + ')\\s*)\\([^)]*\\)'),
            lookbehind: !0,
            inside: {
                'label-key': { pattern: /\b[^,]*\b/, alias: 'attr-name' },
                punctuation: /[(),]/,
            },
        },
        'context-labels': {
            pattern: /\{[^{}]*\}/,
            inside: {
                'label-key': {
                    pattern: /\b[a-z_]\w*(?=\s*(?:=~?|![=~]))/,
                    alias: 'attr-name',
                },
                'label-value': {
                    pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
                    greedy: !0,
                    alias: 'attr-value',
                },
                punctuation: /\{|\}|=~?|![=~]|,/,
            },
        },
        'context-range': [
            {
                pattern: /\[[\w\s:]+\]/,
                inside: {
                    punctuation: /\[|\]|:/,
                    'range-duration': {
                        pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i,
                        alias: 'number',
                    },
                },
            },
            {
                pattern: /(\boffset\s+)\w+/,
                lookbehind: !0,
                inside: {
                    'range-duration': {
                        pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i,
                        alias: 'number',
                    },
                },
            },
        ],
        keyword: new RegExp('\\b(?:' + a.join('|') + ')\\b', 'i'),
        function: /\b[a-zA-Z_]\w*(?=\s*\()/i,
        number: /[-+]?(?:(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[-+]?\d+)?\b|\b(?:0x[0-9a-f]+|nan|inf)\b)/i,
        operator: /[\^*/%+-]|==|!=|<=|<|>=|>|\b(?:and|unless|or)\b/i,
        punctuation: /[{};()`,.[\]]/,
    }
})(Prism)
!(function (e) {
    var s =
        /\b(?:double|float|[su]?int(?:32|64)|s?fixed(?:32|64)|bool|string|bytes)\b/
    ;(e.languages.protobuf = e.languages.extend('clike', {
        'class-name': [
            {
                pattern:
                    /(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/,
                lookbehind: !0,
            },
            {
                pattern:
                    /(\b(?:rpc\s+\w+|returns)\s*\(\s*(?:stream\s+)?)\.?[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?=\s*\))/,
                lookbehind: !0,
            },
        ],
        keyword:
            /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|returns|rpc(?=\s+\w)|service|stream|syntax|to)\b(?!\s*=\s*\d)/,
        function: /[a-z_]\w*(?=\s*\()/i,
    })),
        e.languages.insertBefore('protobuf', 'operator', {
            map: {
                pattern:
                    /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[a-z_]\w*\s*[=;])/i,
                alias: 'class-name',
                inside: { punctuation: /[<>.,]/, builtin: s },
            },
            builtin: s,
            'positional-class-name': {
                pattern:
                    /(?:\b|\B\.)[a-z_]\w*(?:\.[a-z_]\w*)*(?=\s+[a-z_]\w*\s*[=;])/i,
                alias: 'class-name',
                inside: { punctuation: /\./ },
            },
            annotation: {
                pattern: /(\[\s*)[a-z_]\w*(?=\s*=)/i,
                lookbehind: !0,
            },
        })
})(Prism)
!(function (e) {
    e.languages.puppet = {
        heredoc: [
            {
                pattern:
                    /(@\("([^"\r\n\/):]+)"(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r(?!\n)))*?[ \t]*(?:\|[ \t]*)?(?:-[ \t]*)?\2/,
                lookbehind: !0,
                alias: 'string',
                inside: { punctuation: /(?=\S).*\S(?= *$)/ },
            },
            {
                pattern:
                    /(@\(([^"\r\n\/):]+)(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r(?!\n)))*?[ \t]*(?:\|[ \t]*)?(?:-[ \t]*)?\2/,
                lookbehind: !0,
                greedy: !0,
                alias: 'string',
                inside: { punctuation: /(?=\S).*\S(?= *$)/ },
            },
            {
                pattern: /@\("?(?:[^"\r\n\/):]+)"?(?:\/[nrts$uL]*)?\)/,
                alias: 'string',
                inside: {
                    punctuation: { pattern: /(\().+?(?=\))/, lookbehind: !0 },
                },
            },
        ],
        'multiline-comment': {
            pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
            lookbehind: !0,
            greedy: !0,
            alias: 'comment',
        },
        regex: {
            pattern:
                /((?:\bnode\s+|[~=\(\[\{,]\s*|[=+]>\s*|^\s*))\/(?:[^\/\\]|\\[\s\S])+\/(?:[imx]+\b|\B)/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                'extended-regex': {
                    pattern: /^\/(?:[^\/\\]|\\[\s\S])+\/[im]*x[im]*$/,
                    inside: { comment: /#.*/ },
                },
            },
        },
        comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
        string: {
            pattern:
                /(["'])(?:\$\{(?:[^'"}]|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}|\$(?!\{)|(?!\1)[^\\$]|\\[\s\S])*\1/,
            greedy: !0,
            inside: { 'double-quoted': { pattern: /^"[\s\S]*"$/, inside: {} } },
        },
        variable: {
            pattern: /\$(?:::)?\w+(?:::\w+)*/,
            inside: { punctuation: /::/ },
        },
        'attr-name': /(?:\w+|\*)(?=\s*=>)/,
        function: [
            { pattern: /(\.)(?!\d)\w+/, lookbehind: !0 },
            /\b(?:contain|debug|err|fail|include|info|notice|realize|require|tag|warning)\b|\b(?!\d)\w+(?=\()/,
        ],
        number: /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e-?\d+)?)\b/i,
        boolean: /\b(?:true|false)\b/,
        keyword:
            /\b(?:application|attr|case|class|consumes|default|define|else|elsif|function|if|import|inherits|node|private|produces|type|undef|unless)\b/,
        datatype: {
            pattern:
                /\b(?:Any|Array|Boolean|Callable|Catalogentry|Class|Collection|Data|Default|Enum|Float|Hash|Integer|NotUndef|Numeric|Optional|Pattern|Regexp|Resource|Runtime|Scalar|String|Struct|Tuple|Type|Undef|Variant)\b/,
            alias: 'symbol',
        },
        operator:
            /=[=~>]?|![=~]?|<(?:<\|?|[=~|-])?|>[>=]?|->?|~>|\|>?>?|[*\/%+?]|\b(?:and|in|or)\b/,
        punctuation: /[\[\]{}().,;]|:+/,
    }
    var n = [
        {
            pattern:
                /(^|[^\\])\$\{(?:[^'"{}]|\{[^}]*\}|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}/,
            lookbehind: !0,
            inside: {
                'short-variable': {
                    pattern: /(^\$\{)(?!\w+\()(?:::)?\w+(?:::\w+)*/,
                    lookbehind: !0,
                    alias: 'variable',
                    inside: { punctuation: /::/ },
                },
                delimiter: { pattern: /^\$/, alias: 'variable' },
                rest: e.languages.puppet,
            },
        },
        {
            pattern: /(^|[^\\])\$(?:::)?\w+(?:::\w+)*/,
            lookbehind: !0,
            alias: 'variable',
            inside: { punctuation: /::/ },
        },
    ]
    ;(e.languages.puppet.heredoc[0].inside.interpolation = n),
        (e.languages.puppet.string.inside[
            'double-quoted'
        ].inside.interpolation = n)
})(Prism)
;(Prism.languages.purescript = Prism.languages.extend('haskell', {
    keyword:
        /\b(?:ado|case|class|data|derive|do|else|forall|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
    'import-statement': {
        pattern:
            /(^\s*)import\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*(?:\s+as\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
        lookbehind: !0,
        inside: { keyword: /\b(?:import|as|hiding)\b/ },
    },
    builtin:
        /\b(?:absurd|add|ap|append|apply|between|bind|bottom|clamp|compare|comparing|compose|conj|const|degree|discard|disj|div|eq|flap|flip|gcd|identity|ifM|join|lcm|liftA1|liftM1|map|max|mempty|min|mod|mul|negate|not|notEq|one|otherwise|recip|show|sub|top|unit|unless|unlessM|void|when|whenM|zero)\b/,
})),
    (Prism.languages.purs = Prism.languages.purescript)
;(Prism.languages.python = {
    comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
    'string-interpolation': {
        pattern:
            /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
        greedy: !0,
        inside: {
            interpolation: {
                pattern:
                    /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
                lookbehind: !0,
                inside: {
                    'format-spec': {
                        pattern: /(:)[^:(){}]+(?=}$)/,
                        lookbehind: !0,
                    },
                    'conversion-option': {
                        pattern: /![sra](?=[:}]$)/,
                        alias: 'punctuation',
                    },
                    rest: null,
                },
            },
            string: /[\s\S]+/,
        },
    },
    'triple-quoted-string': {
        pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
        greedy: !0,
        alias: 'string',
    },
    string: {
        pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
        greedy: !0,
    },
    function: {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
        lookbehind: !0,
    },
    'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
    decorator: {
        pattern: /(^\s*)@\w+(?:\.\w+)*/im,
        lookbehind: !0,
        alias: ['annotation', 'punctuation'],
        inside: { punctuation: /\./ },
    },
    keyword:
        /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin:
        /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:True|False|None)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/,
}),
    (Prism.languages.python[
        'string-interpolation'
    ].inside.interpolation.inside.rest = Prism.languages.python),
    (Prism.languages.py = Prism.languages.python)
Prism.languages.r = {
    comment: /#.*/,
    string: { pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    'percent-operator': { pattern: /%[^%\s]*%/, alias: 'operator' },
    boolean: /\b(?:TRUE|FALSE)\b/,
    ellipsis: /\.\.(?:\.|\d+)/,
    number: [
        /\b(?:NaN|Inf)\b/,
        /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/,
    ],
    keyword:
        /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
    operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
    punctuation: /[(){}\[\],;]/,
}
!(function (i) {
    var t = i.util.clone(i.languages.javascript)
    ;(i.languages.jsx = i.languages.extend('markup', t)),
        (i.languages.jsx.tag.pattern =
            /<\/?(?:[\w.:-]+(?:\s+(?:[\w.:$-]+(?:=(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s{'">=]+|\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}))?|\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}))*\s*\/?)?>/i),
        (i.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
        (i.languages.jsx.tag.inside['attr-value'].pattern =
            /=(?!\{)(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s'">]+)/i),
        (i.languages.jsx.tag.inside.tag.inside['class-name'] =
            /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
        i.languages.insertBefore(
            'inside',
            'attr-name',
            {
                spread: {
                    pattern:
                        /\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}/,
                    inside: { punctuation: /\.{3}|[{}.]/, 'attr-value': /\w+/ },
                },
            },
            i.languages.jsx.tag
        ),
        i.languages.insertBefore(
            'inside',
            'attr-value',
            {
                script: {
                    pattern: /=(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\})/i,
                    inside: {
                        'script-punctuation': {
                            pattern: /^=(?={)/,
                            alias: 'punctuation',
                        },
                        rest: i.languages.jsx,
                    },
                    alias: 'language-javascript',
                },
            },
            i.languages.jsx.tag
        )
    var o = function (t) {
            return t
                ? 'string' == typeof t
                    ? t
                    : 'string' == typeof t.content
                      ? t.content
                      : t.content.map(o).join('')
                : ''
        },
        p = function (t) {
            for (var n = [], e = 0; e < t.length; e++) {
                var a = t[e],
                    s = !1
                if (
                    ('string' != typeof a &&
                        ('tag' === a.type &&
                        a.content[0] &&
                        'tag' === a.content[0].type
                            ? '</' === a.content[0].content[0].content
                                ? 0 < n.length &&
                                  n[n.length - 1].tagName ===
                                      o(a.content[0].content[1]) &&
                                  n.pop()
                                : '/>' ===
                                      a.content[a.content.length - 1].content ||
                                  n.push({
                                      tagName: o(a.content[0].content[1]),
                                      openedBraces: 0,
                                  })
                            : 0 < n.length &&
                                'punctuation' === a.type &&
                                '{' === a.content
                              ? n[n.length - 1].openedBraces++
                              : 0 < n.length &&
                                  0 < n[n.length - 1].openedBraces &&
                                  'punctuation' === a.type &&
                                  '}' === a.content
                                ? n[n.length - 1].openedBraces--
                                : (s = !0)),
                    (s || 'string' == typeof a) &&
                        0 < n.length &&
                        0 === n[n.length - 1].openedBraces)
                ) {
                    var g = o(a)
                    e < t.length - 1 &&
                        ('string' == typeof t[e + 1] ||
                            'plain-text' === t[e + 1].type) &&
                        ((g += o(t[e + 1])), t.splice(e + 1, 1)),
                        0 < e &&
                            ('string' == typeof t[e - 1] ||
                                'plain-text' === t[e - 1].type) &&
                            ((g = o(t[e - 1]) + g), t.splice(e - 1, 1), e--),
                        (t[e] = new i.Token('plain-text', g, null, g))
                }
                a.content && 'string' != typeof a.content && p(a.content)
            }
        }
    i.hooks.add('after-tokenize', function (t) {
        ;('jsx' !== t.language && 'tsx' !== t.language) || p(t.tokens)
    })
})(Prism)
!(function (a) {
    var e = a.util.clone(a.languages.typescript)
    a.languages.tsx = a.languages.extend('jsx', e)
    var t = a.languages.tsx.tag
    ;(t.pattern = RegExp(
        '(^|[^\\w$]|(?=</))(?:' + t.pattern.source + ')',
        t.pattern.flags
    )),
        (t.lookbehind = !0)
})(Prism)
!(function (a) {
    var e = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: 'escape' },
        n =
            /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|c[a-zA-Z]|0[0-7]{0,2}|[123][0-7]{2}|.)/,
        t = '(?:[^\\\\-]|' + n.source + ')',
        s = RegExp(t + '-' + t),
        i = {
            pattern: /(<|')[^<>']+(?=[>']$)/,
            lookbehind: !0,
            alias: 'variable',
        }
    a.languages.regex = {
        charset: {
            pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
            lookbehind: !0,
            inside: {
                'charset-negation': {
                    pattern: /(^\[)\^/,
                    lookbehind: !0,
                    alias: 'operator',
                },
                'charset-punctuation': {
                    pattern: /^\[|\]$/,
                    alias: 'punctuation',
                },
                range: {
                    pattern: s,
                    inside: {
                        escape: n,
                        'range-punctuation': {
                            pattern: /-/,
                            alias: 'operator',
                        },
                    },
                },
                'special-escape': e,
                charclass: {
                    pattern: /\\[wsd]|\\p{[^{}]+}/i,
                    alias: 'class-name',
                },
                escape: n,
            },
        },
        'special-escape': e,
        charclass: { pattern: /\.|\\[wsd]|\\p{[^{}]+}/i, alias: 'class-name' },
        backreference: [
            { pattern: /\\(?![123][0-7]{2})[1-9]/, alias: 'keyword' },
            {
                pattern: /\\k<[^<>']+>/,
                alias: 'keyword',
                inside: { 'group-name': i },
            },
        ],
        anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: 'function' },
        escape: n,
        group: [
            {
                pattern:
                    /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
                alias: 'punctuation',
                inside: { 'group-name': i },
            },
            { pattern: /\)/, alias: 'punctuation' },
        ],
        quantifier: {
            pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
            alias: 'number',
        },
        alternation: { pattern: /\|/, alias: 'keyword' },
    }
})(Prism)
Prism.languages.rest = {
    table: [
        {
            pattern:
                /(\s*)(?:\+[=-]+)+\+(?:\r?\n|\r)(?:\1[+|].+[+|](?:\r?\n|\r))+\1(?:\+[=-]+)+\+/,
            lookbehind: !0,
            inside: { punctuation: /\||(?:\+[=-]+)+\+/ },
        },
        {
            pattern:
                /(\s*)=+ [ =]*=(?:(?:\r?\n|\r)\1.+)+(?:\r?\n|\r)\1=+ [ =]*=(?=(?:\r?\n|\r){2}|\s*$)/,
            lookbehind: !0,
            inside: { punctuation: /[=-]+/ },
        },
    ],
    'substitution-def': {
        pattern: /(^\s*\.\. )\|(?:[^|\s](?:[^|]*[^|\s])?)\| [^:]+::/m,
        lookbehind: !0,
        inside: {
            substitution: {
                pattern: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/,
                alias: 'attr-value',
                inside: { punctuation: /^\||\|$/ },
            },
            directive: {
                pattern: /( +)(?! )[^:]+::/,
                lookbehind: !0,
                alias: 'function',
                inside: { punctuation: /::$/ },
            },
        },
    },
    'link-target': [
        {
            pattern: /(^\s*\.\. )\[[^\]]+\]/m,
            lookbehind: !0,
            alias: 'string',
            inside: { punctuation: /^\[|\]$/ },
        },
        {
            pattern: /(^\s*\.\. )_(?:`[^`]+`|(?:[^:\\]|\\.)+):/m,
            lookbehind: !0,
            alias: 'string',
            inside: { punctuation: /^_|:$/ },
        },
    ],
    directive: {
        pattern: /(^\s*\.\. )[^:]+::/m,
        lookbehind: !0,
        alias: 'function',
        inside: { punctuation: /::$/ },
    },
    comment: {
        pattern:
            /(^\s*\.\.)(?:(?: .+)?(?:(?:\r?\n|\r).+)+| .+)(?=(?:\r?\n|\r){2}|$)/m,
        lookbehind: !0,
    },
    title: [
        {
            pattern:
                /^(([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+)(?:\r?\n|\r).+(?:\r?\n|\r)\1$/m,
            inside: {
                punctuation:
                    /^[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+|[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
                important: /.+/,
            },
        },
        {
            pattern:
                /(^|(?:\r?\n|\r){2}).+(?:\r?\n|\r)([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+(?=\r?\n|\r|$)/,
            lookbehind: !0,
            inside: {
                punctuation: /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
                important: /.+/,
            },
        },
    ],
    hr: {
        pattern:
            /((?:\r?\n|\r){2})([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2{3,}(?=(?:\r?\n|\r){2})/,
        lookbehind: !0,
        alias: 'punctuation',
    },
    field: {
        pattern: /(^\s*):[^:\r\n]+:(?= )/m,
        lookbehind: !0,
        alias: 'attr-name',
    },
    'command-line-option': {
        pattern:
            /(^\s*)(?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?(?:, (?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?)*(?=(?:\r?\n|\r)? {2,}\S)/im,
        lookbehind: !0,
        alias: 'symbol',
    },
    'literal-block': {
        pattern: /::(?:\r?\n|\r){2}([ \t]+)(?![ \t]).+(?:(?:\r?\n|\r)\1.+)*/,
        inside: {
            'literal-block-punctuation': {
                pattern: /^::/,
                alias: 'punctuation',
            },
        },
    },
    'quoted-literal-block': {
        pattern:
            /::(?:\r?\n|\r){2}([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]).*(?:(?:\r?\n|\r)\1.*)*/,
        inside: {
            'literal-block-punctuation': {
                pattern:
                    /^(?:::|([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\1*)/m,
                alias: 'punctuation',
            },
        },
    },
    'list-bullet': {
        pattern:
            /(^\s*)(?:[*+\-•‣⁃]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?= )/im,
        lookbehind: !0,
        alias: 'punctuation',
    },
    'doctest-block': {
        pattern: /(^\s*)>>> .+(?:(?:\r?\n|\r).+)*/m,
        lookbehind: !0,
        inside: { punctuation: /^>>>/ },
    },
    inline: [
        {
            pattern:
                /(^|[\s\-:\/'"<(\[{])(?::[^:]+:`.*?`|`.*?`:[^:]+:|(\*\*?|``?|\|)(?!\s).*?[^\s]\2(?=[\s\-.,:;!?\\\/'")\]}]|$))/m,
            lookbehind: !0,
            inside: {
                bold: { pattern: /(^\*\*).+(?=\*\*$)/, lookbehind: !0 },
                italic: { pattern: /(^\*).+(?=\*$)/, lookbehind: !0 },
                'inline-literal': {
                    pattern: /(^``).+(?=``$)/,
                    lookbehind: !0,
                    alias: 'symbol',
                },
                role: {
                    pattern: /^:[^:]+:|:[^:]+:$/,
                    alias: 'function',
                    inside: { punctuation: /^:|:$/ },
                },
                'interpreted-text': {
                    pattern: /(^`).+(?=`$)/,
                    lookbehind: !0,
                    alias: 'attr-value',
                },
                substitution: {
                    pattern: /(^\|).+(?=\|$)/,
                    lookbehind: !0,
                    alias: 'attr-value',
                },
                punctuation: /\*\*?|``?|\|/,
            },
        },
    ],
    link: [
        {
            pattern: /\[[^\]]+\]_(?=[\s\-.,:;!?\\\/'")\]}]|$)/,
            alias: 'string',
            inside: { punctuation: /^\[|\]_$/ },
        },
        {
            pattern:
                /(?:\b[a-z\d]+(?:[_.:+][a-z\d]+)*_?_|`[^`]+`_?_|_`[^`]+`)(?=[\s\-.,:;!?\\\/'")\]}]|$)/i,
            alias: 'string',
            inside: { punctuation: /^_?`|`$|`?_?_$/ },
        },
    ],
    punctuation: {
        pattern: /(^\s*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m,
        lookbehind: !0,
    },
}
!(function (e) {
    for (
        var a = '/\\*(?:[^*/]|\\*(?!/)|/(?!\\*)|<self>)*\\*/', t = 0;
        t < 2;
        t++
    )
        a = a.replace(/<self>/g, function () {
            return a
        })
    ;(a = a.replace(/<self>/g, function () {
        return '[^\\s\\S]'
    })),
        (e.languages.rust = {
            comment: [
                {
                    pattern: RegExp('(^|[^\\\\])' + a),
                    lookbehind: !0,
                    greedy: !0,
                },
                { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
            ],
            string: {
                pattern:
                    /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
                greedy: !0,
            },
            char: {
                pattern:
                    /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
                greedy: !0,
                alias: 'string',
            },
            attribute: {
                pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
                greedy: !0,
                alias: 'attr-name',
                inside: { string: null },
            },
            'closure-params': {
                pattern:
                    /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
                lookbehind: !0,
                greedy: !0,
                inside: {
                    'closure-punctuation': {
                        pattern: /^\||\|$/,
                        alias: 'punctuation',
                    },
                    rest: null,
                },
            },
            'lifetime-annotation': { pattern: /'\w+/, alias: 'symbol' },
            'fragment-specifier': {
                pattern: /(\$\w+:)[a-z]+/,
                lookbehind: !0,
                alias: 'punctuation',
            },
            variable: /\$\w+/,
            'function-definition': {
                pattern: /(\bfn\s+)\w+/,
                lookbehind: !0,
                alias: 'function',
            },
            'type-definition': {
                pattern: /(\b(?:enum|struct|union)\s+)\w+/,
                lookbehind: !0,
                alias: 'class-name',
            },
            'module-declaration': [
                {
                    pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
                    lookbehind: !0,
                    alias: 'namespace',
                },
                {
                    pattern:
                        /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
                    lookbehind: !0,
                    alias: 'namespace',
                    inside: { punctuation: /::/ },
                },
            ],
            keyword: [
                /\b(?:abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|Self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
                /\b(?:[ui](?:8|16|32|64|128|size)|f(?:32|64)|bool|char|str)\b/,
            ],
            function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
            macro: { pattern: /\w+!/, alias: 'property' },
            constant: /\b[A-Z_][A-Z_\d]+\b/,
            'class-name': /\b[A-Z]\w*\b/,
            namespace: {
                pattern:
                    /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
                inside: { punctuation: /::/ },
            },
            number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64|size)?|f32|f64))?\b/,
            boolean: /\b(?:false|true)\b/,
            punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
            operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
        }),
        (e.languages.rust['closure-params'].inside.rest = e.languages.rust),
        (e.languages.rust.attribute.inside.string = e.languages.rust.string)
})(Prism)
!(function (e) {
    ;(e.languages.sass = e.languages.extend('css', {
        comment: {
            pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
            lookbehind: !0,
        },
    })),
        e.languages.insertBefore('sass', 'atrule', {
            'atrule-line': {
                pattern: /^(?:[ \t]*)[@+=].+/m,
                inside: { atrule: /(?:@[\w-]+|[+=])/m },
            },
        }),
        delete e.languages.sass.atrule
    var t = /\$[-\w]+|#\{\$[-\w]+\}/,
        a = [
            /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
            { pattern: /(\s+)-(?=\s)/, lookbehind: !0 },
        ]
    e.languages.insertBefore('sass', 'property', {
        'variable-line': {
            pattern: /^[ \t]*\$.+/m,
            inside: { punctuation: /:/, variable: t, operator: a },
        },
        'property-line': {
            pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
            inside: {
                property: [
                    /[^:\s]+(?=\s*:)/,
                    { pattern: /(:)[^:\s]+/, lookbehind: !0 },
                ],
                punctuation: /:/,
                variable: t,
                operator: a,
                important: e.languages.sass.important,
            },
        },
    }),
        delete e.languages.sass.property,
        delete e.languages.sass.important,
        e.languages.insertBefore('sass', 'punctuation', {
            selector: {
                pattern:
                    /([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/,
                lookbehind: !0,
            },
        })
})(Prism)
;(Prism.languages.scss = Prism.languages.extend('css', {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
    },
    atrule: {
        pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
        inside: { rule: /@[\w-]+/ },
    },
    url: /(?:[-a-z]+-)?url(?=\()/i,
    selector: {
        pattern:
            /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]+))/m,
        inside: {
            parent: { pattern: /&/, alias: 'important' },
            placeholder: /%[-\w]+/,
            variable: /\$[-\w]+|#\{\$[-\w]+\}/,
        },
    },
    property: {
        pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
        inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
    },
})),
    Prism.languages.insertBefore('scss', 'atrule', {
        keyword: [
            /@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i,
            { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
        ],
    }),
    Prism.languages.insertBefore('scss', 'important', {
        variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    }),
    Prism.languages.insertBefore('scss', 'function', {
        'module-modifier': {
            pattern: /\b(?:as|with|show|hide)\b/i,
            alias: 'keyword',
        },
        placeholder: { pattern: /%[-\w]+/, alias: 'selector' },
        statement: { pattern: /\B!(?:default|optional)\b/i, alias: 'keyword' },
        boolean: /\b(?:true|false)\b/,
        null: { pattern: /\bnull\b/, alias: 'keyword' },
        operator: {
            pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
            lookbehind: !0,
        },
    }),
    (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss)
!(function (s) {
    var n = [
        '(["\'])(?:\\\\[^]|\\$\\([^)]+\\)|\\$(?!\\()|`[^`]+`|(?!\\1)[^\\\\`$])*\\1',
        '<<-?\\s*(["\']?)(\\w+)\\2\\s[^]*?[\r\n]\\3',
    ].join('|')
    ;(s.languages['shell-session'] = {
        command: {
            pattern: RegExp(
                '^(?:[^\\s@:$#*!/\\\\]+@[^\\s@:$#*!/\\\\]+(?::[^\0-\\x1F$#*?"<>:;|]+)?|[^\0-\\x1F$#*?"<>:;|]+)?[$#](?:[^\\\\\r\n\'"<]|\\\\.|<<str>>)+'.replace(
                    /<<str>>/g,
                    function () {
                        return n
                    }
                ),
                'm'
            ),
            greedy: !0,
            inside: {
                info: {
                    pattern: /^[^#$]+/,
                    alias: 'punctuation',
                    inside: {
                        user: /^[^\s@:$#*!/\\]+@[^\s@:$#*!/\\]+/,
                        punctuation: /:/,
                        path: /[\s\S]+/,
                    },
                },
                bash: {
                    pattern: /(^[$#]\s*)\S[\s\S]*/,
                    lookbehind: !0,
                    alias: 'language-bash',
                    inside: s.languages.bash,
                },
                'shell-symbol': { pattern: /^[$#]/, alias: 'important' },
            },
        },
        output: /.(?:.*(?:[\r\n]|.$))*/,
    }),
        (s.languages['sh-session'] = s.languages.shellsession =
            s.languages['shell-session'])
})(Prism)
Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: !0,
    },
    variable: [
        { pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 },
        /@[\w.$]+/,
    ],
    string: {
        pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
        greedy: !0,
        lookbehind: !0,
    },
    function:
        /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword:
        /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    operator:
        /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/,
}
!(function (e) {
    var n = { pattern: /(\b\d+)(?:%|[a-z]+)/, lookbehind: !0 },
        r = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 },
        i = {
            comment: {
                pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                lookbehind: !0,
            },
            url: { pattern: /url\((["']?).*?\1\)/i, greedy: !0 },
            string: {
                pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
                greedy: !0,
            },
            interpolation: null,
            func: null,
            important: /\B!(?:important|optional)\b/i,
            keyword: {
                pattern:
                    /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
                lookbehind: !0,
            },
            hexcode: /#[\da-f]{3,6}/i,
            color: [
                /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
                {
                    pattern:
                        /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
                    inside: {
                        unit: n,
                        number: r,
                        function: /[\w-]+(?=\()/,
                        punctuation: /[(),]/,
                    },
                },
            ],
            entity: /\\[\da-f]{1,8}/i,
            unit: n,
            boolean: /\b(?:true|false)\b/,
            operator: [
                /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/,
            ],
            number: r,
            punctuation: /[{}()\[\];:,]/,
        }
    ;(i.interpolation = {
        pattern: /\{[^\r\n}:]+\}/,
        alias: 'variable',
        inside: {
            delimiter: { pattern: /^{|}$/, alias: 'punctuation' },
            rest: i,
        },
    }),
        (i.func = {
            pattern: /[\w-]+\([^)]*\).*/,
            inside: { function: /^[^(]+/, rest: i },
        }),
        (e.languages.stylus = {
            'atrule-declaration': {
                pattern: /(^\s*)@.+/m,
                lookbehind: !0,
                inside: { atrule: /^@[\w-]+/, rest: i },
            },
            'variable-declaration': {
                pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:\{[^{}]*\}|\S.*|$)/m,
                lookbehind: !0,
                inside: { variable: /^\S+/, rest: i },
            },
            statement: {
                pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t].+/m,
                lookbehind: !0,
                inside: { keyword: /^\S+/, rest: i },
            },
            'property-declaration': {
                pattern:
                    /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)(?!\s)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(?:\r?\n|\r)(?:\{|\2[ \t]+)))/m,
                lookbehind: !0,
                inside: {
                    property: {
                        pattern: /^[^\s:]+/,
                        inside: { interpolation: i.interpolation },
                    },
                    rest: i,
                },
            },
            selector: {
                pattern:
                    /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
                lookbehind: !0,
                inside: {
                    interpolation: i.interpolation,
                    comment: i.comment,
                    punctuation: /[{},]/,
                },
            },
            func: i.func,
            string: i.string,
            comment: {
                pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                lookbehind: !0,
                greedy: !0,
            },
            interpolation: i.interpolation,
            punctuation: /[{}()\[\];:.]/,
        })
})(Prism)
;(Prism.languages.swift = Prism.languages.extend('clike', {
    string: {
        pattern:
            /("|')(?:\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[^(])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
                inside: {
                    delimiter: { pattern: /^\\\(|\)$/, alias: 'variable' },
                },
            },
        },
    },
    keyword:
        /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
    number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
    constant: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
    atrule: /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
    builtin:
        /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/,
})),
    (Prism.languages.swift.string.inside.interpolation.inside.rest =
        Prism.languages.swift)
!(function (e) {
    function n(e) {
        return e.replace(/__/g, function () {
            return '(?:[\\w-]+|\'[^\'\n\r]*\'|"(?:\\\\.|[^\\\\"\r\n])*")'
        })
    }
    e.languages.toml = {
        comment: { pattern: /#.*/, greedy: !0 },
        table: {
            pattern: RegExp(
                n('(^\\s*\\[\\s*(?:\\[\\s*)?)__(?:\\s*\\.\\s*__)*(?=\\s*\\])'),
                'm'
            ),
            lookbehind: !0,
            greedy: !0,
            alias: 'class-name',
        },
        key: {
            pattern: RegExp(
                n('(^\\s*|[{,]\\s*)__(?:\\s*\\.\\s*__)*(?=\\s*=)'),
                'm'
            ),
            lookbehind: !0,
            greedy: !0,
            alias: 'property',
        },
        string: {
            pattern:
                /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
            greedy: !0,
        },
        date: [
            {
                pattern:
                    /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,
                alias: 'number',
            },
            { pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/, alias: 'number' },
        ],
        number: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,
        boolean: /\b(?:true|false)\b/,
        punctuation: /[.,=[\]{}]/,
    }
})(Prism)
Prism.languages.twig = {
    comment: /\{#[\s\S]*?#\}/,
    tag: {
        pattern: /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/,
        inside: {
            ld: {
                pattern: /^(?:\{\{-?|\{%-?\s*\w+)/,
                inside: { punctuation: /^(?:\{\{|\{%)-?/, keyword: /\w+/ },
            },
            rd: { pattern: /-?(?:%\}|\}\})$/, inside: { punctuation: /.+/ } },
            string: {
                pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
                inside: { punctuation: /^['"]|['"]$/ },
            },
            keyword: /\b(?:even|if|odd)\b/,
            boolean: /\b(?:true|false|null)\b/,
            number: /\b0x[\dA-Fa-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][-+]?\d+)?/,
            operator: [
                {
                    pattern:
                        /(\s)(?:and|b-and|b-xor|b-or|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
                    lookbehind: !0,
                },
                /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/,
            ],
            property: /\b[a-zA-Z_]\w*\b/,
            punctuation: /[()\[\]{}:.,]/,
        },
    },
    other: { pattern: /\S(?:[\s\S]*\S)?/, inside: Prism.languages.markup },
}
!(function (E) {
    var n =
        /\b(?:ACT|ACTIFSUB|CARRAY|CASE|CLEARGIF|COA|COA_INT|CONSTANTS|CONTENT|CUR|EDITPANEL|EFFECT|EXT|FILE|FLUIDTEMPLATE|FORM|FRAME|FRAMESET|GIFBUILDER|GMENU|GMENU_FOLDOUT|GMENU_LAYERS|GP|HMENU|HRULER|HTML|IENV|IFSUB|IMAGE|IMGMENU|IMGMENUITEM|IMGTEXT|IMG_RESOURCE|INCLUDE_TYPOSCRIPT|JSMENU|JSMENUITEM|LLL|LOAD_REGISTER|NO|PAGE|RECORDS|RESTORE_REGISTER|TEMPLATE|TEXT|TMENU|TMENUITEM|TMENU_LAYERS|USER|USER_INT|_GIFBUILDER|global|globalString|globalVar)\b/
    ;(E.languages.typoscript = {
        comment: [
            { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
            {
                pattern: /(^|[^\\:= \t]|(?:^|[^= \t])[ \t]+)\/\/.*/,
                lookbehind: !0,
                greedy: !0,
            },
            { pattern: /(^|[^"'])#.*/, lookbehind: !0, greedy: !0 },
        ],
        function: [
            {
                pattern:
                    /<INCLUDE_TYPOSCRIPT:\s*source\s*=\s*(?:"[^"\r\n]*"|'[^'\r\n]*')\s*>/,
                inside: {
                    string: {
                        pattern: /"[^"\r\n]*"|'[^'\r\n]*'/,
                        inside: { keyword: n },
                    },
                    keyword: { pattern: /INCLUDE_TYPOSCRIPT/ },
                },
            },
            {
                pattern: /@import\s*(?:"[^"\r\n]*"|'[^'\r\n]*')/,
                inside: { string: /"[^"\r\n]*"|'[^'\r\n]*'/ },
            },
        ],
        string: {
            pattern: /^([^=]*=[< ]?)(?:(?!]\n).)*/,
            lookbehind: !0,
            inside: {
                function: /{\$.*}/,
                keyword: n,
                number: /^[0-9]+$/,
                punctuation: /[,|:]/,
            },
        },
        keyword: n,
        number: { pattern: /[0-9]+\s*[.{=]/, inside: { operator: /[.{=]/ } },
        tag: { pattern: /\.?[\w-\\]+\.?/, inside: { punctuation: /\./ } },
        punctuation: /[{}[\];(),.:|]/,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    }),
        (E.languages.tsconfig = E.languages.typoscript)
})(Prism)
Prism.languages.verilog = {
    comment: /\/\/.*|\/\*[\s\S]*?\*\//,
    string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
    property: /\B\$\w+\b/,
    constant: /\B`\w+\b/,
    function: /\w+(?=\()/,
    keyword:
        /\b(?:alias|and|assert|assign|assume|automatic|before|begin|bind|bins|binsof|bit|break|buf|bufif0|bufif1|byte|class|case|casex|casez|cell|chandle|clocking|cmos|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end|endcase|endclass|endclocking|endconfig|endfunction|endgenerate|endgroup|endinterface|endmodule|endpackage|endprimitive|endprogram|endproperty|endspecify|endsequence|endtable|endtask|enum|event|expect|export|extends|extern|final|first_match|for|force|foreach|forever|fork|forkjoin|function|generate|genvar|highz0|highz1|if|iff|ifnone|ignore_bins|illegal_bins|import|incdir|include|initial|inout|input|inside|instance|int|integer|interface|intersect|join|join_any|join_none|large|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|nand|negedge|new|nmos|nor|noshowcancelled|not|notif0|notif1|null|or|output|package|packed|parameter|pmos|posedge|primitive|priority|program|property|protected|pull0|pull1|pulldown|pullup|pulsestyle_onevent|pulsestyle_ondetect|pure|rand|randc|randcase|randsequence|rcmos|real|realtime|ref|reg|release|repeat|return|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|sequence|shortint|shortreal|showcancelled|signed|small|solve|specify|specparam|static|string|strong0|strong1|struct|super|supply0|supply1|table|tagged|task|this|throughout|time|timeprecision|timeunit|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|type|typedef|union|unique|unsigned|use|uwire|var|vectored|virtual|void|wait|wait_order|wand|weak0|weak1|while|wildcard|wire|with|within|wor|xnor|xor)\b/,
    important: /\b(?:always_latch|always_comb|always_ff|always)\b ?@?/,
    number: /\B##?\d+|(?:\b\d+)?'[odbh] ?[\da-fzx_?]+|\b(?:\d*[._])?\d+(?:e[-+]?\d+)?/i,
    operator: /[-+{}^~%*\/?=!<>&|]+/,
    punctuation: /[[\];(),.:]/,
}
Prism.languages.vhdl = {
    comment: /--.+/,
    'vhdl-vectors': {
        pattern: /\b[oxb]"[\da-f_]+"|"[01uxzwlh-]+"/i,
        alias: 'number',
    },
    'quoted-function': { pattern: /"\S+?"(?=\()/, alias: 'function' },
    string: /"(?:[^\\"\r\n]|\\(?:\r\n|[\s\S]))*"/,
    constant: /\b(?:use|library)\b/i,
    keyword:
        /\b(?:'active|'ascending|'base|'delayed|'driving|'driving_value|'event|'high|'image|'instance_name|'last_active|'last_event|'last_value|'left|'leftof|'length|'low|'path_name|'pos|'pred|'quiet|'range|'reverse_range|'right|'rightof|'simple_name|'stable|'succ|'transaction|'val|'value|access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with)\b/i,
    boolean: /\b(?:true|false)\b/i,
    function: /\w+(?=\()/,
    number: /'[01uxzwlh-]'|\b(?:\d+#[\da-f_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i,
    operator:
        /[<>]=?|:=|[-+*/&=]|\b(?:abs|not|mod|rem|sll|srl|sla|sra|rol|ror|and|or|nand|xnor|xor|nor)\b/i,
    punctuation: /[{}[\];(),.:]/,
}
Prism.languages.vim = {
    string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
    comment: /".*/,
    function: /\w+(?=\()/,
    keyword:
        /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
    builtin:
        /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
    number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
    operator:
        /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
    punctuation: /[{}[\](),;:]/,
}
;(Prism.languages['visual-basic'] = {
    comment: {
        pattern: /(?:['‘’]|REM\b)(?:[^\r\n_]|_(?:\r\n?|\n)?)*/i,
        inside: { keyword: /^REM/i },
    },
    directive: {
        pattern:
            /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i,
        alias: 'comment',
        greedy: !0,
    },
    string: { pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]C?/i, greedy: !0 },
    date: {
        pattern:
            /#[^\S\r\n]*(?:\d+([/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))?|\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?)[^\S\r\n]*#/i,
        alias: 'builtin',
    },
    number: /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i,
    boolean: /\b(?:True|False|Nothing)\b/i,
    keyword:
        /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Currency|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|Type|TypeOf|U(?:Integer|Long|Short)|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Until|Xor)\b/i,
    operator: [
        /[+\-*/\\^<=>&#@$%!]/,
        { pattern: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/, lookbehind: !0 },
    ],
    punctuation: /[{}().,:?]/,
}),
    (Prism.languages.vb = Prism.languages['visual-basic']),
    (Prism.languages.vba = Prism.languages['visual-basic'])
Prism.languages.wasm = {
    comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
    string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
    keyword: [
        { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
        {
            pattern:
                /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
            inside: { punctuation: /\./ },
        },
        /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/,
    ],
    variable: /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
    number: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
    punctuation: /[()]/,
}
!(function (n) {
    function a(a, e) {
        n.languages[a] &&
            n.languages.insertBefore(a, 'comment', { 'doc-comment': e })
    }
    var e = n.languages.markup.tag,
        t = {
            pattern: /\/\/\/.*/,
            greedy: !0,
            alias: 'comment',
            inside: { tag: e },
        },
        g = {
            pattern: /'''.*/,
            greedy: !0,
            alias: 'comment',
            inside: { tag: e },
        }
    a('csharp', t), a('fsharp', t), a('vbnet', g)
})(Prism)
!(function (e) {
    var n = /[*&][^\s[\]{},]+/,
        r =
            /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
        t =
            '(?:' +
            r.source +
            '(?:[ \t]+' +
            n.source +
            ')?|' +
            n.source +
            '(?:[ \t]+' +
            r.source +
            ')?)',
        a =
            '(?:[^\\s\\x00-\\x08\\x0e-\\x1f!"#%&\'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*'.replace(
                /<PLAIN>/g,
                function () {
                    return '[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]'
                }
            ),
        d = '"(?:[^"\\\\\r\n]|\\\\.)*"|\'(?:[^\'\\\\\r\n]|\\\\.)*\''
    function o(e, n) {
        n = (n || '').replace(/m/g, '') + 'm'
        var r =
            '([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|]|}|(?:[\r\n]\\s*)?#))'
                .replace(/<<prop>>/g, function () {
                    return t
                })
                .replace(/<<value>>/g, function () {
                    return e
                })
        return RegExp(r, n)
    }
    ;(e.languages.yaml = {
        scalar: {
            pattern: RegExp(
                '([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\\S[^\r\n]*(?:\\2[^\r\n]+)*)'.replace(
                    /<<prop>>/g,
                    function () {
                        return t
                    }
                )
            ),
            lookbehind: !0,
            alias: 'string',
        },
        comment: /#.*/,
        key: {
            pattern: RegExp(
                '((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\\s*:\\s)'
                    .replace(/<<prop>>/g, function () {
                        return t
                    })
                    .replace(/<<key>>/g, function () {
                        return '(?:' + a + '|' + d + ')'
                    })
            ),
            lookbehind: !0,
            greedy: !0,
            alias: 'atrule',
        },
        directive: {
            pattern: /(^[ \t]*)%.+/m,
            lookbehind: !0,
            alias: 'important',
        },
        datetime: {
            pattern: o(
                '\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?'
            ),
            lookbehind: !0,
            alias: 'number',
        },
        boolean: {
            pattern: o('true|false', 'i'),
            lookbehind: !0,
            alias: 'important',
        },
        null: { pattern: o('null|~', 'i'), lookbehind: !0, alias: 'important' },
        string: { pattern: o(d), lookbehind: !0, greedy: !0 },
        number: {
            pattern: o(
                '[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.?\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)',
                'i'
            ),
            lookbehind: !0,
        },
        tag: r,
        important: n,
        punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
    }),
        (e.languages.yml = e.languages.yaml)
})(Prism)
!(function () {
    if (
        'undefined' != typeof self &&
        self.Prism &&
        self.document &&
        document.querySelector
    ) {
        var t,
            s = function () {
                if (void 0 === t) {
                    var e = document.createElement('div')
                    ;(e.style.fontSize = '13px'),
                        (e.style.lineHeight = '1.5'),
                        (e.style.padding = '0'),
                        (e.style.border = '0'),
                        (e.innerHTML = '&nbsp;<br />&nbsp;'),
                        document.body.appendChild(e),
                        (t = 38 === e.offsetHeight),
                        document.body.removeChild(e)
                }
                return t
            },
            b = !0,
            a = 0
        Prism.hooks.add('before-sanity-check', function (e) {
            var t = e.element.parentElement,
                n = t && t.getAttribute('data-line')
            if (t && n && /pre/i.test(t.nodeName)) {
                var i = 0
                v('.line-highlight', t).forEach(function (e) {
                    ;(i += e.textContent.length), e.parentNode.removeChild(e)
                }),
                    i &&
                        /^( \n)+$/.test(e.code.slice(-i)) &&
                        (e.code = e.code.slice(0, -i))
            }
        }),
            Prism.hooks.add('complete', function e(t) {
                var n = t.element.parentElement,
                    i = n && n.getAttribute('data-line')
                if (n && i && /pre/i.test(n.nodeName)) {
                    clearTimeout(a)
                    var r = Prism.plugins.lineNumbers,
                        o = t.plugins && t.plugins.lineNumbers
                    if (y(n, 'line-numbers') && r && !o)
                        Prism.hooks.add('line-numbers', e)
                    else l(n, i)(), (a = setTimeout(u, 1))
                }
            }),
            window.addEventListener('hashchange', u),
            window.addEventListener('resize', function () {
                v('pre[data-line]')
                    .map(function (e) {
                        return l(e)
                    })
                    .forEach(E)
            })
    }
    function v(e, t) {
        return Array.prototype.slice.call((t || document).querySelectorAll(e))
    }
    function y(e, t) {
        return (
            (t = ' ' + t + ' '),
            -1 < (' ' + e.className + ' ').replace(/[\n\t]/g, ' ').indexOf(t)
        )
    }
    function E(e) {
        e()
    }
    function l(u, e, d) {
        var t = (e = 'string' == typeof e ? e : u.getAttribute('data-line'))
                .replace(/\s+/g, '')
                .split(',')
                .filter(Boolean),
            c = +u.getAttribute('data-line-offset') || 0,
            f = (s() ? parseInt : parseFloat)(getComputedStyle(u).lineHeight),
            p = y(u, 'line-numbers'),
            n = u.querySelector('code'),
            m = p ? u : n || u,
            h = [],
            g =
                n && m != n
                    ? (function (e, t) {
                          var n = getComputedStyle(e),
                              i = getComputedStyle(t)
                          function r(e) {
                              return +e.substr(0, e.length - 2)
                          }
                          return (
                              t.offsetTop +
                              r(i.borderTopWidth) +
                              r(i.paddingTop) -
                              r(n.paddingTop)
                          )
                      })(u, n)
                    : 0
        t.forEach(function (e) {
            var t = e.split('-'),
                n = +t[0],
                i = +t[1] || n,
                r =
                    u.querySelector(
                        '.line-highlight[data-range="' + e + '"]'
                    ) || document.createElement('div')
            if (
                (h.push(function () {
                    r.setAttribute('aria-hidden', 'true'),
                        r.setAttribute('data-range', e),
                        (r.className = (d || '') + ' line-highlight')
                }),
                p && Prism.plugins.lineNumbers)
            ) {
                var o = Prism.plugins.lineNumbers.getLine(u, n),
                    a = Prism.plugins.lineNumbers.getLine(u, i)
                if (o) {
                    var l = o.offsetTop + g + 'px'
                    h.push(function () {
                        r.style.top = l
                    })
                }
                if (a) {
                    var s = a.offsetTop - o.offsetTop + a.offsetHeight + 'px'
                    h.push(function () {
                        r.style.height = s
                    })
                }
            } else
                h.push(function () {
                    r.setAttribute('data-start', String(n)),
                        n < i && r.setAttribute('data-end', String(i)),
                        (r.style.top = (n - c - 1) * f + g + 'px'),
                        (r.textContent = new Array(i - n + 2).join(' \n'))
                })
            h.push(function () {
                m.appendChild(r)
            })
        })
        var i = u.id
        if (p && i) {
            for (var r = 'linkable-line-numbers', o = !1, a = u; a; ) {
                if (y(a, r)) {
                    o = !0
                    break
                }
                a = a.parentElement
            }
            if (o) {
                y(u, r) ||
                    h.push(function () {
                        u.className = (u.className + ' ' + r).trim()
                    })
                var l = parseInt(u.getAttribute('data-start') || '1')
                v('.line-numbers-rows > span', u).forEach(function (e, t) {
                    var n = t + l
                    e.onclick = function () {
                        var e = i + '.' + n
                        ;(b = !1),
                            (location.hash = e),
                            setTimeout(function () {
                                b = !0
                            }, 1)
                    }
                })
            }
        }
        return function () {
            h.forEach(E)
        }
    }
    function u() {
        var e = location.hash.slice(1)
        v('.temporary.line-highlight').forEach(function (e) {
            e.parentNode.removeChild(e)
        })
        var t = (e.match(/\.([\d,-]+)$/) || [, ''])[1]
        if (t && !document.getElementById(e)) {
            var n = e.slice(0, e.lastIndexOf('.')),
                i = document.getElementById(n)
            if (i)
                i.hasAttribute('data-line') || i.setAttribute('data-line', ''),
                    l(i, t, 'temporary ')(),
                    b &&
                        document
                            .querySelector('.temporary.line-highlight')
                            .scrollIntoView()
        }
    }
})()
!(function () {
    if ('undefined' != typeof self && self.Prism && self.document) {
        var o = 'line-numbers',
            a = /\n(?!$)/g,
            e = (Prism.plugins.lineNumbers = {
                getLine: function (e, n) {
                    if ('PRE' === e.tagName && e.classList.contains(o)) {
                        var t = e.querySelector('.line-numbers-rows')
                        if (t) {
                            var i =
                                    parseInt(
                                        e.getAttribute('data-start'),
                                        10
                                    ) || 1,
                                r = i + (t.children.length - 1)
                            n < i && (n = i), r < n && (n = r)
                            var s = n - i
                            return t.children[s]
                        }
                    }
                },
                resize: function (e) {
                    u([e])
                },
                assumeViewportIndependence: !0,
            }),
            t = function (e) {
                return e
                    ? window.getComputedStyle
                        ? getComputedStyle(e)
                        : e.currentStyle || null
                    : null
            },
            n = void 0
        window.addEventListener('resize', function () {
            ;(e.assumeViewportIndependence && n === window.innerWidth) ||
                ((n = window.innerWidth),
                u(
                    Array.prototype.slice.call(
                        document.querySelectorAll('pre.' + o)
                    )
                ))
        }),
            Prism.hooks.add('complete', function (e) {
                if (e.code) {
                    var n = e.element,
                        t = n.parentNode
                    if (
                        t &&
                        /pre/i.test(t.nodeName) &&
                        !n.querySelector('.line-numbers-rows') &&
                        Prism.util.isActive(n, o)
                    ) {
                        n.classList.remove(o), t.classList.add(o)
                        var i,
                            r = e.code.match(a),
                            s = r ? r.length + 1 : 1,
                            l = new Array(s + 1).join('<span></span>')
                        ;(i = document.createElement('span')).setAttribute(
                            'aria-hidden',
                            'true'
                        ),
                            (i.className = 'line-numbers-rows'),
                            (i.innerHTML = l),
                            t.hasAttribute('data-start') &&
                                (t.style.counterReset =
                                    'linenumber ' +
                                    (parseInt(
                                        t.getAttribute('data-start'),
                                        10
                                    ) -
                                        1)),
                            e.element.appendChild(i),
                            u([t]),
                            Prism.hooks.run('line-numbers', e)
                    }
                }
            }),
            Prism.hooks.add('line-numbers', function (e) {
                ;(e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0)
            })
    }
    function u(e) {
        if (
            0 !=
            (e = e.filter(function (e) {
                var n = t(e)['white-space']
                return 'pre-wrap' === n || 'pre-line' === n
            })).length
        ) {
            var n = e
                .map(function (e) {
                    var n = e.querySelector('code'),
                        t = e.querySelector('.line-numbers-rows')
                    if (n && t) {
                        var i = e.querySelector('.line-numbers-sizer'),
                            r = n.textContent.split(a)
                        i ||
                            (((i = document.createElement('span')).className =
                                'line-numbers-sizer'),
                            n.appendChild(i)),
                            (i.innerHTML = '0'),
                            (i.style.display = 'block')
                        var s = i.getBoundingClientRect().height
                        return (
                            (i.innerHTML = ''),
                            {
                                element: e,
                                lines: r,
                                lineHeights: [],
                                oneLinerHeight: s,
                                sizer: i,
                            }
                        )
                    }
                })
                .filter(Boolean)
            n.forEach(function (e) {
                var i = e.sizer,
                    n = e.lines,
                    r = e.lineHeights,
                    s = e.oneLinerHeight
                ;(r[n.length - 1] = void 0),
                    n.forEach(function (e, n) {
                        if (e && 1 < e.length) {
                            var t = i.appendChild(
                                document.createElement('span')
                            )
                            ;(t.style.display = 'block'), (t.textContent = e)
                        } else r[n] = s
                    })
            }),
                n.forEach(function (e) {
                    for (
                        var n = e.sizer, t = e.lineHeights, i = 0, r = 0;
                        r < t.length;
                        r++
                    )
                        void 0 === t[r] &&
                            (t[r] =
                                n.children[i++].getBoundingClientRect().height)
                }),
                n.forEach(function (e) {
                    var n = e.sizer,
                        t = e.element.querySelector('.line-numbers-rows')
                    ;(n.style.display = 'none'),
                        (n.innerHTML = ''),
                        e.lineHeights.forEach(function (e, n) {
                            t.children[n].style.height = e + 'px'
                        })
                })
        }
    }
})()
!(function () {
    if ('undefined' != typeof self && self.Prism && self.document) {
        var i = [],
            l = {},
            c = function () {}
        Prism.plugins.toolbar = {}
        var e = (Prism.plugins.toolbar.registerButton = function (e, n) {
                var t
                ;(t =
                    'function' == typeof n
                        ? n
                        : function (e) {
                              var t
                              return (
                                  'function' == typeof n.onClick
                                      ? (((t =
                                            document.createElement(
                                                'button'
                                            )).type = 'button'),
                                        t.addEventListener(
                                            'click',
                                            function () {
                                                n.onClick.call(this, e)
                                            }
                                        ))
                                      : 'string' == typeof n.url
                                        ? ((t =
                                              document.createElement(
                                                  'a'
                                              )).href = n.url)
                                        : (t = document.createElement('span')),
                                  n.className && t.classList.add(n.className),
                                  (t.textContent = n.text),
                                  t
                              )
                          }),
                    e in l
                        ? console.warn(
                              'There is a button with the key "' +
                                  e +
                                  '" registered already.'
                          )
                        : i.push((l[e] = t))
            }),
            t = (Prism.plugins.toolbar.hook = function (a) {
                var e = a.element.parentNode
                if (
                    e &&
                    /pre/i.test(e.nodeName) &&
                    !e.parentNode.classList.contains('code-toolbar')
                ) {
                    var t = document.createElement('div')
                    t.classList.add('code-toolbar'),
                        e.parentNode.insertBefore(t, e),
                        t.appendChild(e)
                    var r = document.createElement('div')
                    r.classList.add('toolbar')
                    var n = i,
                        o = (function (e) {
                            for (; e; ) {
                                var t = e.getAttribute('data-toolbar-order')
                                if (null != t)
                                    return (t = t.trim()).length
                                        ? t.split(/\s*,\s*/g)
                                        : []
                                e = e.parentElement
                            }
                        })(a.element)
                    o &&
                        (n = o.map(function (e) {
                            return l[e] || c
                        })),
                        n.forEach(function (e) {
                            var t = e(a)
                            if (t) {
                                var n = document.createElement('div')
                                n.classList.add('toolbar-item'),
                                    n.appendChild(t),
                                    r.appendChild(n)
                            }
                        }),
                        t.appendChild(r)
                }
            })
        e('label', function (e) {
            var t = e.element.parentNode
            if (t && /pre/i.test(t.nodeName) && t.hasAttribute('data-label')) {
                var n,
                    a,
                    r = t.getAttribute('data-label')
                try {
                    a = document.querySelector('template#' + r)
                } catch (e) {}
                return (
                    a
                        ? (n = a.content)
                        : (t.hasAttribute('data-url')
                              ? ((n = document.createElement('a')).href =
                                    t.getAttribute('data-url'))
                              : (n = document.createElement('span')),
                          (n.textContent = r)),
                    n
                )
            }
        }),
            Prism.hooks.add('complete', t)
    }
})()
!(function () {
    if ('undefined' != typeof self && self.Prism && self.document)
        if (Prism.plugins.toolbar) {
            var r = {
                none: 'Plain text',
                html: 'HTML',
                xml: 'XML',
                svg: 'SVG',
                mathml: 'MathML',
                ssml: 'SSML',
                rss: 'RSS',
                css: 'CSS',
                clike: 'C-like',
                js: 'JavaScript',
                abap: 'ABAP',
                abnf: 'ABNF',
                al: 'AL',
                antlr4: 'ANTLR4',
                g4: 'ANTLR4',
                apacheconf: 'Apache Configuration',
                apl: 'APL',
                aql: 'AQL',
                arff: 'ARFF',
                asciidoc: 'AsciiDoc',
                adoc: 'AsciiDoc',
                aspnet: 'ASP.NET (C#)',
                asm6502: '6502 Assembly',
                autohotkey: 'AutoHotkey',
                autoit: 'AutoIt',
                basic: 'BASIC',
                bbcode: 'BBcode',
                bnf: 'BNF',
                rbnf: 'RBNF',
                bsl: 'BSL (1C:Enterprise)',
                oscript: 'OneScript',
                csharp: 'C#',
                cs: 'C#',
                dotnet: 'C#',
                cpp: 'C++',
                cil: 'CIL',
                cmake: 'CMake',
                coffee: 'CoffeeScript',
                conc: 'Concurnas',
                csp: 'Content-Security-Policy',
                'css-extras': 'CSS Extras',
                dataweave: 'DataWeave',
                dax: 'DAX',
                django: 'Django/Jinja2',
                jinja2: 'Django/Jinja2',
                'dns-zone-file': 'DNS zone file',
                'dns-zone': 'DNS zone file',
                dockerfile: 'Docker',
                ebnf: 'EBNF',
                editorconfig: 'EditorConfig',
                ejs: 'EJS',
                etlua: 'Embedded Lua templating',
                erb: 'ERB',
                'excel-formula': 'Excel Formula',
                xlsx: 'Excel Formula',
                xls: 'Excel Formula',
                fsharp: 'F#',
                'firestore-security-rules': 'Firestore security rules',
                ftl: 'FreeMarker Template Language',
                gml: 'GameMaker Language',
                gamemakerlanguage: 'GameMaker Language',
                gcode: 'G-code',
                gdscript: 'GDScript',
                gedcom: 'GEDCOM',
                glsl: 'GLSL',
                graphql: 'GraphQL',
                hs: 'Haskell',
                hcl: 'HCL',
                hlsl: 'HLSL',
                http: 'HTTP',
                hpkp: 'HTTP Public-Key-Pins',
                hsts: 'HTTP Strict-Transport-Security',
                ichigojam: 'IchigoJam',
                ignore: '.ignore',
                gitignore: '.gitignore',
                hgignore: '.hgignore',
                npmignore: '.npmignore',
                inform7: 'Inform 7',
                javadoc: 'JavaDoc',
                javadoclike: 'JavaDoc-like',
                javastacktrace: 'Java stack trace',
                jq: 'JQ',
                jsdoc: 'JSDoc',
                'js-extras': 'JS Extras',
                json: 'JSON',
                webmanifest: 'Web App Manifest',
                json5: 'JSON5',
                jsonp: 'JSONP',
                jsstacktrace: 'JS stack trace',
                'js-templates': 'JS Templates',
                kts: 'Kotlin Script',
                kt: 'Kotlin',
                latex: 'LaTeX',
                tex: 'TeX',
                context: 'ConTeXt',
                lilypond: 'LilyPond',
                ly: 'LilyPond',
                emacs: 'Lisp',
                elisp: 'Lisp',
                'emacs-lisp': 'Lisp',
                llvm: 'LLVM IR',
                lolcode: 'LOLCODE',
                md: 'Markdown',
                'markup-templating': 'Markup templating',
                matlab: 'MATLAB',
                mel: 'MEL',
                mongodb: 'MongoDB',
                moon: 'MoonScript',
                n1ql: 'N1QL',
                n4js: 'N4JS',
                n4jsd: 'N4JS',
                'nand2tetris-hdl': 'Nand To Tetris HDL',
                naniscript: 'Naninovel Script',
                nani: 'Naninovel Script',
                nasm: 'NASM',
                neon: 'NEON',
                nginx: 'nginx',
                nsis: 'NSIS',
                objectivec: 'Objective-C',
                objc: 'Objective-C',
                ocaml: 'OCaml',
                opencl: 'OpenCL',
                parigp: 'PARI/GP',
                objectpascal: 'Object Pascal',
                pcaxis: 'PC-Axis',
                px: 'PC-Axis',
                peoplecode: 'PeopleCode',
                pcode: 'PeopleCode',
                php: 'PHP',
                phpdoc: 'PHPDoc',
                'php-extras': 'PHP Extras',
                plsql: 'PL/SQL',
                powerquery: 'PowerQuery',
                pq: 'PowerQuery',
                mscript: 'PowerQuery',
                powershell: 'PowerShell',
                promql: 'PromQL',
                properties: '.properties',
                protobuf: 'Protocol Buffers',
                purebasic: 'PureBasic',
                pbfasm: 'PureBasic',
                purs: 'PureScript',
                py: 'Python',
                q: 'Q (kdb+ database)',
                qml: 'QML',
                rkt: 'Racket',
                jsx: 'React JSX',
                tsx: 'React TSX',
                renpy: "Ren'py",
                rpy: "Ren'py",
                rest: 'reST (reStructuredText)',
                robotframework: 'Robot Framework',
                robot: 'Robot Framework',
                rb: 'Ruby',
                sas: 'SAS',
                sass: 'Sass (Sass)',
                scss: 'Sass (Scss)',
                'shell-session': 'Shell session',
                'sh-session': 'Shell session',
                shellsession: 'Shell session',
                sml: 'SML',
                smlnj: 'SML/NJ',
                solidity: 'Solidity (Ethereum)',
                sol: 'Solidity (Ethereum)',
                'solution-file': 'Solution file',
                sln: 'Solution file',
                soy: 'Soy (Closure Template)',
                sparql: 'SPARQL',
                rq: 'SPARQL',
                'splunk-spl': 'Splunk SPL',
                sqf: 'SQF: Status Quo Function (Arma 3)',
                sql: 'SQL',
                iecst: 'Structured Text (IEC 61131-3)',
                't4-templating': 'T4 templating',
                't4-cs': 'T4 Text Templates (C#)',
                t4: 'T4 Text Templates (C#)',
                't4-vb': 'T4 Text Templates (VB)',
                tap: 'TAP',
                tt2: 'Template Toolkit 2',
                toml: 'TOML',
                trig: 'TriG',
                ts: 'TypeScript',
                tsconfig: 'TSConfig',
                uscript: 'UnrealScript',
                uc: 'UnrealScript',
                vbnet: 'VB.Net',
                vhdl: 'VHDL',
                vim: 'vim',
                'visual-basic': 'Visual Basic',
                vba: 'VBA',
                vb: 'Visual Basic',
                wasm: 'WebAssembly',
                wiki: 'Wiki markup',
                xeoracube: 'XeoraCube',
                'xml-doc': 'XML doc (.net)',
                xojo: 'Xojo (REALbasic)',
                xquery: 'XQuery',
                yaml: 'YAML',
                yml: 'YAML',
                yang: 'YANG',
            }
            Prism.plugins.toolbar.registerButton('show-language', function (e) {
                var a = e.element.parentNode
                if (a && /pre/i.test(a.nodeName)) {
                    var s,
                        t =
                            a.getAttribute('data-language') ||
                            r[e.language] ||
                            ((s = e.language)
                                ? (
                                      s.substring(0, 1).toUpperCase() +
                                      s.substring(1)
                                  ).replace(/s(?=cript)/, 'S')
                                : s)
                    if (t) {
                        var o = document.createElement('span')
                        return (o.textContent = t), o
                    }
                }
            })
        } else
            console.warn('Show Languages plugin loaded before Toolbar plugin.')
})()
