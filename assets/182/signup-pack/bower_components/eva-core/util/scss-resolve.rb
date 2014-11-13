#!/usr/bin/env ruby

file=ARGV[0]
def resolve(file)
  path=File.dirname(file)
  puts File.basename(file)
  unless File.exists? file
    file = file + '.scss'
  end
  #file="%s/_%s" [path,File.basename(file)] unless File.exist? file
  content=File.open(file,"r") {|f| f.read}
  content.gsub(/^\s*@import\s*\"(.*)\"\s*;\s*$/) {resolve(File.expand_path("%s/%s" % [path,$1]))}
end
resolved=resolve(file)
File.open(ARGV[1], "w"){|f| f.write(resolved)} 


