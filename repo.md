Most of my public code repository has dependency to the sciBASIC# framework. And all of the scientific computing project 
is built upon the GCModeller stack. So if you have found some project not found problem when you open my open source 
project in VisualStudio, then it means the project have source project dependency to sciBASIC# or GCModeller project. So
you needs to clone of the sciBASIC# or GCModeller project and place to a correct location for solve this problem:

Usually, the source project layout on my hard drive is (you can fixed of the problem by clone GCModeller or sciBASIC project
to a location like below):

+ /
  + [mzkit](https://github.com/xieguigang/mzkit)
  + [GCModeller](https://github.com/SMRUCC/GCModeller)
     + src
        + runtime 
           + [sciBASIC#](https://github.com/xieguigang/sciBASIC)
           + [Darwinism](https://github.com/xieguigang/Darwinism)
        + [R-sharp](https://github.com/SMRUCC/R-sharp)
  + [console](https://github.com/xieguigang/console)
  + [mini-R](https://github.com/xieguigang/mini-R)
