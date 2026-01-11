// ============================================
// Handle Browser Back/Forward Navigation
// ============================================

import { smoothScrollTo } from "../scrollNavegation";
import { updateActiveNavLink } from "../sectionDetection";

export default function initHandleBrowserBackForward(){
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            smoothScrollTo(hash);
            updateActiveNavLink(hash);
        }
    });

}
