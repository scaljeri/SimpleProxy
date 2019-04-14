FROM docker.io/centos
ENV USER_NAME dev
ENV SOFT_DIR /opt
ENV NODE_VERSION 11.14.0
ENV NODE_PATH $SOFT_DIR/node-v${NODE_VERSION}-linux-x64/bin
ENV PATH "$PATH:./node_modules/.bin:/usr/bin"
WORKDIR /cv

RUN yum update -y; yum makecache fast; yum -y install zsh initscripts openssl which telnet epel-release sudo fontconfig; yum clean all; yum groupinstall "Development Tools" -y && yum install -y python-setuptools.noarch net-tools which sshpass texlive texlive-latex texlive-xetex texlive-collection-xetex ghostscript && easy_install supervisor && zsh
RUN curl --silent --location https://rpm.nodesource.com/setup_9.x | bash - && yum -y install nodejs && npm install -g gulp yarn && echo "root:root" | chpasswd
RUN sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
RUN chmod u+w /etc/sudoers && sed -i 's/^%wheel/#wheel/' /etc/sudoers && sed -i 's/# %wheel/%wheel/' /etc/sudoers && chmod u-w /etc/sudoers; groupadd -r dev && useradd -r -m -b /home -g wheel dev && echo "dev:dev123" | chpasswd
# RUN echo "export PS1='\$PROMPT \w $> '" >> /root/.zshrc

RUN export PATH="$NODE_PATH:$PATH:/usr/bin"

# ENTRYPOINT  ["node", "./bin/watch-files.js"]
