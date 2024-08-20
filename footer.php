<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    

    <footer class="footer bg-dark text-light pt-md-5 pb-md-3">
        <div class="container">
            <div class="row">
                <!-- Locations Section -->
                <div class="col-md-4 footer_location_div">
                    <h5 class="pb-md-4 footer_location_heading">Locations</h5>
                    <a href="#" class="d-flex align-items-start gap-2 footer_location_1">
                        <img class="location_flags" src="images/flag_india.png">
                        <span class="text-light location_text"> 
                            1304, Meraki Arena, V N Purav Marg, Opp.
                            R K Studio, Chembur East, Mumbai
                            400071, Maharashtra, India 
                        </span> 
                    </a>
                    <a href="#" class="d-flex align-items-start gap-2 footer_location_2">
                        <img class="location_flags" src="images/flag_brazil.png">
                        <span class="text-light location_text"> 
                            1304, Meraki Arena, V N Purav Marg, Opp.
                            R K Studio, Chembur East, Mumbai
                            400071, Maharashtra, India 
                        </span> 
                    </a>
                    <div class="d-flex gap-2">
                        <i class="fa fa-phone"></i>
                        <span>
                            <h6 class="d-block mb-0">Overseas Business Enquiries: <br>
                            </h6> 
                                <a href="tel:+5519989563731" class="footer_contact_links">
                                    +55 19 989563731
                                </a>
                        </span>
                    </div>
                </div>
    
                <!-- Contact Info Section -->
                <div class="col-md-3 footer_contact_div ps-md-0">
                    <h5 class="pb-md-4 footer_contact_heading">Contact Info</h5>
                    <div class="d-flex align-items-start gap-2 pb-md-3">
                        <i class="fa fa-phone"></i>
                        <span>Mobile Number: <br>
                            <a href="tel:+919619603699" class="footer_contact_links">
                                +91 9619603699
                            </a>
                        </span> 
                    </div>
                    <div class="d-flex align-items-start gap-2 pb-md-3">
                        <i class="fa fa-phone"></i>
                        <span>Landline Number: <br>
                            <a href="tel:+912235137822" class="footer_contact_links">
                                +91-22-35137822 / +91-22-35137821
                            </a>
                        </span> 
                    </div>
                    <div class="d-flex align-items-start gap-2 pb-md-3">
                        <i class="fa fa-envelope"></i>
                            <a href="mailto:sales@sagarspecialitychemicals.com" class="footer_contact_links">
                                sales@sagarspecialitychemicals.com
                            </a>
                    </div>
                </div>
    
                <!-- Useful Links Section -->
                <div class="col-md-2 footer_useful_link_1_div ps-md-3">
                    <h5 class="pb-md-4 footer_useful_link_1_heading">Useful Links</h5>
                    <ul class="list-group-item list-unstyled">
                        <li class="list-item"> <a href="#" class="footer_useful_link_1_links">Home</a> </li>
                        <li class="list-item"> <a href="about-us.php" class="footer_useful_link_1_links">Company Profile</a> </li>
                        <li class="list-item"> <a href="#" class="footer_useful_link_1_links">Industry Areas</a> </li>
                        <li class="list-item"> <a href="enquire.php" class="footer_useful_link_1_links">Client</a> </li>
                        <li class="list-item"> <a href="contact-us.php" class="footer_useful_link_1_links">Contact Us</a> </li>
                        <li class="list-item"> <a href="#" class="footer_useful_link_1_links">Terms & Condition</a> </li>
                        <li class="list-item"> <a href="#" class="footer_useful_link_1_links">Privacy Policy</a> </li>
                    </ul>
                </div>

                <div class="col-md-3 footer_useful_link_2_div">
                <h5 class="pb-md-4 footer_useful_link_2_heading">Useful Links</h5>
                    <ul class="list-group-item list-unstyled">
                        <li class="list-item"> <a href="#" class="footer_useful_link_2_links">Chemicals Imports & Exports</a> </li>
                        <li class="list-item"> <a href="#" class="footer_useful_link_2_links">Supply Chain Solutions</a> </li>
                        <li class="list-item"> <a href="#" class="footer_useful_link_2_links">Supply Chain Partner</a> </li>
                        <li class="list-item">
                            <ul class="list-group-item list-unstyled d-flex gap-4 social_media_icon pt-md-3">
                                <li class="list-item"> 
                                    <a href="" class="footer_useful_link_2_links">
                                        <i class="fa fa-linkedin-in"></i>
                                    </a> 
                                </li>

                                <li class="list-item"> 
                                    <a href="" class="footer_useful_link_2_links">
                                        <i class="fa fa-instagram"></i>
                                    </a> 
                                </li>

                                <li class="list-item"> 
                                    <a href="" class="footer_useful_link_2_links">
                                        <i class="fa fa-x-twitter"></i>
                                    </a> 
                                </li>

                                <li class="list-item"> 
                                    <a href="" class="footer_useful_link_2_links">
                                        <i class="fa fa-facebook"></i>
                                    </a> 
                                </li>
                            </ul>                        
                        </li>
                    </ul>
                </div>
            </div>

            <br class="d-md-block d-none">
            <hr>
            <div class="pt-md-2 footer_copyright text-center">
                <span class="copyright_content"> © Copyright - Sagar Speciality Chemicals Pvt. Ltd. | Designed by Nexgeno</span>
            </div>
        </div>
    </footer>
    

    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
    <script type="text/javascript" src="js/owl-carousel.js"></script>
    <script type="text/javascript" src="js/bootstrap5.min.js"></script>


    <script>
        $(document).ready(function () {
            var owl = $("#home_page_banner_slider").owlCarousel({
                onInitialized: function(event) {
                    // Adding transform3d property
                    $('.owl-stage').css('transform-style', 'preserve-3d');
                },
                loop: true,
                margin: 0,
                autoplay: true,
                nav: true,
                dots: false,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                mouseDrag: false, // Disable drag
                touchDrag: false, // Disable touch drag
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            });
        });

        $(document).ready(function () {
            var owl = $("#what_we_do_slider").owlCarousel({
                onInitialized: function(event) {
                    // Adding transform3d property
                    $('.owl-stage').css('transform-style', 'preserve-3d');
                },
                loop: true,
                margin: 30,
                autoplay: true,
                autoplaySpeed:3000,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 3
                    }
                }
            });
        });

        $(document).ready(function () {
            var owl = $("#future_activity_slider").owlCarousel({
                onInitialized: function(event) {
                    // Adding transform3d property
                    $('.owl-stage').css('transform-style', 'preserve-3d');
                },
                loop: true,
                margin: 30,
                autoplay: true,
                autoplaySpeed:3000,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 3
                    }
                }
            });
        });
        
    </script>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var header = document.getElementById("mainHeader");
            if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                header.classList.add("transparent");
            }
        });
    </script>
        
</body>
</html>
</body>
</html>