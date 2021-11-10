project_name=$1
static_path=$2
environment=$3

# Exit the script on any command with non 0 return code
# We assume that all the commands in the pipeline set their return code
# properly and that we do not need to validate that the output is correct
set -e

# Echo every command being executed
set -x

pre_build() {
  echo "start"
  if [[ "$environment" == "online" ]]; then
    yarn && NODE_ENV=production ENVIRONMENT=online yarn build
  else
    yarn && NODE_ENV=production yarn build
  fi
}

copy_static() {
  node tools/clearmap.js
  project_static_path=""
  if [[ $static_path != */ ]]; then
    project_static_path=${static_path}/"$project_name"
  else
    project_static_path=${static_path}"$project_name"
  fi

  cd "$static_path"

  # wait until other jobs finished
  waitCount=20
  while [ -n "$(git status --porcelain)" ]; do
    echo "Your git status is not clean. waiting...";
    ((waitCount--))
    if [ $waitCount -lt 1 ]; then
      exit 1
    fi
    sleep 3
  done

  git checkout master
  git pull -r origin master

  if [ ! -d "$project_static_path"/_next ]; then
    mkdir -p "$project_static_path"/_next
  fi
  cp -nr "$1"/.next/static "$project_static_path"/_next/

  ls "$project_static_path"/_next/static

  git add . && \
  git commit -m "$(git config user.name) 发布 sunflower-mobileweb 静态资源. time: $(date)" && \
  git push origin master

  echo "deploy static success!"
}

sub_build(){
  if [ "$1" == "" ]; then
        echo "ERROR: please specify project name"
        exit 1
  fi
  if [ "$2" == "" ]; then
        echo "ERROR: please specify static path"
        exit 1
  fi
  current_path="$(pwd)"
  pre_build
  copy_static "$current_path"
  cd "$current_path" || exit 1

}

sub_build "$@"
