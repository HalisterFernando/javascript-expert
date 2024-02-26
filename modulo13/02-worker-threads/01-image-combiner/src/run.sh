IMAGE_URL="https://i0.wp.com/scifiguresreview.com/wp-content/uploads/2021/12/assassino-4.png"
BACKGROUND_URL="https://www.newegg.com/insider/wp-content/uploads/windows_xp_bliss-wide.jpg"

curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
autocannon --renderStatusCodes -c500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"