import React from 'react';
import "../css/Footer.css"
// import facebook from "/facebook.png";
// import instagram from "/instagram.png";
// import x from "/x.png";
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h4>Click&Shop</h4>
                    <ul>
                        <li><a href="/hakkimizda">Hakkımızda</a></li>
                        <li><a href="/iletisim">İletişim</a></li>
                        <li><a href="/sss">SSS</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Popüler Sayfalar</h4>
                    <ul>
                        <li><a href="/urunler/cantalar">Kampanyalar</a></li>
                        <li><a href="/urunler/ceketler">Yeni Gelenler</a></li>
                        <li><a href="/urunler/aksesuarlar">En çok satanlar</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Bize Ulaşın</h4>
                    <p>Email: <a href="mailto:info@clickandshop.com">info@clickandshop.com</a></p>
                    <div className="social-media">

                        <img src="/facebook.png" alt='facebook' width={50} height={50} />

                        <img src="/instagram.jpg" alt='instagram' width={50} height={50} />

                        <img src="/x.png" alt='x' width={50} height={50} />


                    </div>

                </div>
                <div className="footer-column">
                    <h4>Ödeme</h4>
                    <p>© 2025 Click&Shop. Tüm Hakları Saklıdır.</p>
                    <div className="payment-methods">

                        <img src="/visa.png" alt='visa' width={50} height={50} />

                        <img src="/troy.png" alt='troy' width={50} height={50} />

                        <img src="/masterCard.png" alt='masterCard' width={50} height={50} />


                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
