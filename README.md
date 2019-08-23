```
docker run -it -d --name compose-by-git -v /root/.ssh:/root/.ssh -v <cloned-compose-directory>:/data -v /var/run/docker.sock:/var/run/docker.sock -p 6170:8080 burgrp/compose-by-git
```