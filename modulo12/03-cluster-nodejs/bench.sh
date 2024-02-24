URL=localhost:3000
npx autocannon $URL -m POST \
    --warmup [-c 1 -d 3] \
    --connections 500 \
    --renderStatusCodes

# cat log.txt| grep 12535| wc -l    