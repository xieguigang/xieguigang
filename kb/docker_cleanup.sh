# make cleanup of the docker files

# removes all stop docker container
docker container prune

# removes all dangling images that not in used
docker rmi $(docker images -f "dangling=true" -q)
