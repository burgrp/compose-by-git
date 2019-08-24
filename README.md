```
docker run -it -d --name compose-by-git --restart=always -v /root/.ssh:/root/.ssh -v <cloned-compose-directory>:/git -v /var/run/docker.sock:/var/run/docker.sock -p 6170:8080 -w /git burgrp/compose-by-git
```