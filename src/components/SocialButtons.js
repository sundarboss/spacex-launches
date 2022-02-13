import React from 'react';
import { 
FacebookShareButton, 
FacebookIcon, 
TwitterShareButton, 
TwitterIcon, 
WhatsappShareButton, 
WhatsappIcon 
} from 'react-share';

const SocialButtons = ({shareUrl}) => {
    const socialShareText = 'Here is the countdown of the Next Launch';

    return (
        <div className='social-btns'>
            <FacebookShareButton url={shareUrl} quote={socialShareText}>
                <FacebookIcon className='share-btn' size={40} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={socialShareText}>
                <TwitterIcon className='share-btn' size={40} />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl} title={socialShareText}>
                <WhatsappIcon className='share-btn' size={40} />
            </WhatsappShareButton>
        </div>
    )
}

export default SocialButtons;