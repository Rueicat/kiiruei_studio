// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="update_journal.html"><strong aria-hidden="true">1.</strong> 最新消息</a></li><li class="chapter-item expanded "><a href="長照2_0簡介.html"><strong aria-hidden="true">2.</strong> 長期照顧2.0服務項目</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="長照2_0服務項目/1照顧服務.html"><strong aria-hidden="true">2.1.</strong> 照顧服務</a></li></ol></li><li class="chapter-item expanded "><a href="longcare_projects/cms_intro.html"><strong aria-hidden="true">3.</strong> 照專行政解決方案(關閉)</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="service/report.html"><strong aria-hidden="true">3.1.</strong> 評估簡述工具</a></li><li class="chapter-item expanded "><a href="service/access.html"><strong aria-hidden="true">3.2.</strong> 個案管理平台</a></li></ol></li><li class="chapter-item expanded "><a href="archive/PRA_ForOHN.html"><strong aria-hidden="true">4.</strong> 職護行政解決方案</a></li><li class="chapter-item expanded "><a href="service/nas.html"><strong aria-hidden="true">5.</strong> 雲端服務(private)</a></li><li class="chapter-item expanded "><a href="service/budget.html"><strong aria-hidden="true">6.</strong> 記帳服務(private)</a></li><li class="chapter-item expanded "><a href="twid/twid_demo.html"><strong aria-hidden="true">7.</strong> 台灣身份證驗證</a></li><li class="chapter-item expanded "><a href="algorithms/algo_intro.html"><strong aria-hidden="true">8.</strong> 演算法(algorithms)研究</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="algorithms/data_struct.html"><strong aria-hidden="true">8.1.</strong> 資料結構</a></li></ol></li><li class="chapter-item expanded "><a href="tui_framework/introduce.html"><strong aria-hidden="true">9.</strong> TUI框架</a></li><li class="chapter-item expanded "><a href="intentions/resolution_md.html"><strong aria-hidden="true">10.</strong> 心術</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="intentions/intensions.html"><strong aria-hidden="true">10.1.</strong> 心術</a></li></ol></li><li class="chapter-item expanded "><a href="Clang/Clang.html"><strong aria-hidden="true">11.</strong> Clang</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="Clang/C-array.html"><strong aria-hidden="true">11.1.</strong> C-array</a></li><li class="chapter-item expanded "><a href="Clang/C-IO.html"><strong aria-hidden="true">11.2.</strong> C-IO</a></li><li class="chapter-item expanded "><a href="Clang/C-Loop.html"><strong aria-hidden="true">11.3.</strong> C-Loop</a></li><li class="chapter-item expanded "><a href="Clang/C-point.html"><strong aria-hidden="true">11.4.</strong> C-point</a></li><li class="chapter-item expanded "><a href="Clang/C-select.html"><strong aria-hidden="true">11.5.</strong> C-select</a></li><li class="chapter-item expanded "><a href="Clang/C-type.html"><strong aria-hidden="true">11.6.</strong> C-type</a></li></ol></li><li class="chapter-item expanded "><a href="admonish_example.html"><strong aria-hidden="true">12.</strong> 渲染測試</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
