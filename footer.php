


    <footer class="footer pt_6">
        <div class=" text-center">
            <a href="index.php" class="text-decoration-none">
                <!-- <img class="header_logo" src="images/footer_logo_2.png"> -->
                 <h4 class="footer_logo_text">azeem dayani</h4>
            </a>
            <div class="col-md-12 footer_links_div">
                <ul class="list-group list-group-horizontal list-unstyled justify-content-center">
                    <li class="list-group-item footer_list">
                        <a href="about-us.php" class="footer_link">about us</a>
                    </li>
                    <li class="list-group-item footer_list">
                        <a href="works.php" class="footer_link">works</a>
                    </li>
                    <li class="list-group-item footer_list">
                        <a href="achievements.php" class="footer_link">Achievements & Accolades</a>
                    </li>
                    <!-- <li class="list-group-item footer_list">
                        <a href="playlist.php" class="footer_link">playlist</a>
                    </li> -->
                    <li class="list-group-item footer_list">
                        <a href="gallery.php" class="footer_link">gallery</a>
                    </li>
                    <li class="list-group-item footer_list">
                        <a href="contact-us.php" class="footer_link">contact us</a>                        
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-md-12 footer_social_links_div">
            <div id="bars3"></div>
            <ul
                class="list-group-item list-unstyled d-flex gap-4 footer_social_media_icons pt-md-3 mb-0 justify-content-center">
                <li class="list-item">
                    <a href="" class="social_media_links">
                        <i class="fa fa-facebook"></i>
                    </a>
                </li>

                <li class="list-item">
                    <a href="" class="social_media_links">
                        <i class="fa fa-x-twitter"></i>
                    </a>
                </li>

                <li class="list-item">
                    <a href="" class="social_media_links">
                        <i class="fa fa-instagram"></i>
                    </a>
                </li>

                <li class="list-item">
                    <a href="" class="social_media_links">
                        <i class="fa fa-linkedin-in"></i>
                    </a>
                </li>
            </ul>
        </div>
    </footer>

    <script type="text/javascript" src="js/libs.min.js"></script>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CSSRulePlugin.min.js" integrity="sha512-IxxYrSNXnt/RJlxNX40+7BQL88FLqvdpVpuV9AuvpNH/NFP0L8xA8WLxWTXx6PYExB5R/ktQisp6tIrnLn8xvw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="text/javascript" src="js/owl-carousel.js"></script>
    <script type="text/javascript" src="js/bootstrap5.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
    <script src="https://attariclasses.in/assets/frontend/js/fancybox.min.js"></script>

    <script>
        document.querySelector('.menu-trigger').addEventListener('change', function () {
            if (this.checked) {
                // Disable scrolling
                document.body.style.overflow = 'hidden';
            } else {
                // Enable scrolling
                document.body.style.overflow = 'auto';
            }
        });
    </script>
<script>
      $(document).ready(function () {
        $('[data-fancybox="gallery"]').fancybox();
      });
    </script>
    <script>
      $(document).ready(function () {
        $(".gallery_yt_video").click(function () {
          var url = $(this).attr("data-youtube-url");
          $("#videoIframe").attr("src", url);
          $("#videoModal").modal("show");
        });

        $(".close").click(function () {
          $("#videoModal").modal("hide");
        });

        $("#videoModal").on("hide.bs.modal", function () {
          $("#videoIframe").attr("src", "");
        });
      });
    </script>

</body>

</html>