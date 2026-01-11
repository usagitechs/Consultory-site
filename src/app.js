
import initFaqAccordion from './faqAccordion';
import initHandleBrowserBackForward from './handleBrowserBackForward';
import initHeaderMobile from './headerMobile';
import initHeaderScrollEffect from './headerScrollEffect';
import initInitialPageLoad from './initialPageLoad';
import initKeyBoardNavegation from './keyboardNavegation';
import initScrollAnimations from './scrollAnimations';
import { initModal } from './modal';
import initScrollNavegation from './scrollNavegation';
import initSectionDetection from './sectionDetection';
import initContactForm from './contactForm';

export default function app(){
    initFaqAccordion();
    initHandleBrowserBackForward();
    initHeaderMobile();
    initHeaderScrollEffect();
    initInitialPageLoad();
    initKeyBoardNavegation();
    initModal();
    initScrollAnimations();
    initScrollNavegation();
    initSectionDetection();
    initContactForm();
}