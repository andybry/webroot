require 'capybara'
require 'capybara/dsl'

 
Capybara.run_server = false

Capybara.current_driver = :selenium

Capybara.app_host = 'http://localhost-which/mega-menu'

 
module MegaMenuTests

  class Test

    include Capybara::DSL

    def run_test
      visit('/')

      # check all hover links
      page.find('.mi-0 a').hover
      page.find('#menu-technology').visible?
      page.find('.mi-1 a').hover
      page.find('#menu-home-and-garden').visible?
      page.find('.mi-2 a').hover
      page.find('#menu-cars').visible?
      page.find('.mi-3 a').hover
      page.find('#menu-money').visible?
      page.find('.mi-4 a').hover
      page.find('#menu-baby-and-child').visible?
      page.find('.mi-5 a').hover
      page.find('#menu-energy').visible?

    end
  end

end
 
t = MegaMenuTests::Test.new

t.run_test